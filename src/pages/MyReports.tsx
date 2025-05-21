import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUserReports } from '@/services/reportService';
import { toast } from '@/components/ui/use-toast';
import { ReportCardSkeleton } from '@/components/ui/skeletons/ReportSkeleton';
import EmptyState from '@/components/ui/EmptyState';

const MyReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getUserReports();
        setReports(data);
        setFilteredReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast({
          title: "Error",
          description: "Failed to load your reports. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Filter and sort reports
    let results = [...reports];
    
    // Apply type filter
    if (filterType !== 'all') {
      results = results.filter(report => report.type === filterType);
    }
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(report => 
        report.title.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === 'name-asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    
    setFilteredReports(results);
  }, [reports, searchQuery, filterType, sortOrder]);

  const getReportTypeLabel = (type) => {
    const types = {
      'blood_work': 'Blood Work',
      'physical_exam': 'Physical Exam',
      'imaging': 'Medical Imaging',
      'vaccination': 'Vaccination',
      'other': 'Other'
    };
    return types[type] || 'Report';
  };

  const getReportStatusBadge = (status) => {
    const statusConfig = {
      'analyzed': { label: 'Analyzed', className: 'bg-green-100 text-green-800' },
      'processing': { label: 'Processing', className: 'bg-blue-100 text-blue-800 animate-pulse' },
      'uploaded': { label: 'Uploaded', className: 'bg-yellow-100 text-yellow-800' },
      'error': { label: 'Error', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || { label: 'Unknown', className: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getReportIcon = (type) => {
    switch(type) {
      case 'blood_work':
        return '🔬';
      case 'physical_exam':
        return '👨‍⚕️';
      case 'imaging':
        return '🔎';
      case 'vaccination':
        return '💉';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
                  My Health Reports
                </h1>
                <p className="text-gray-600">
                  Access and manage all your medical reports in one secure place
                </p>
              </div>
              <Button 
                onClick={() => navigate('/report-upload')}
                className="bg-primary-500 hover:bg-primary-600"
              >
                Upload New Report
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Search reports by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="blood_work">Blood Work</SelectItem>
                      <SelectItem value="physical_exam">Physical Examination</SelectItem>
                      <SelectItem value="imaging">Medical Imaging</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Report Grid */}
            <div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <ReportCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredReports.map((report) => (
                    <Card 
                      key={report._id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getReportIcon(report.type)}</span>
                          <span className="text-sm text-gray-500 font-medium">
                            {getReportTypeLabel(report.type)}
                          </span>
                        </div>
                        {getReportStatusBadge(report.status)}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{report.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {new Date(report.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        
                        <div className="flex justify-between items-center mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-gray-600"
                            onClick={() => window.open(`${window.location.origin}/api/reports/${report._id}/download`, '_blank')}
                          >
                            Download
                          </Button>
                          <Link to={`/report/${report._id}`}>
                            <Button size="sm" className="bg-primary-500 hover:bg-primary-600">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No reports found"
                  description={searchQuery || filterType !== 'all' ? 
                    "Try adjusting your search or filters" : 
                    "Upload your first medical report to get started"}
                  action={{
                    label: "Upload Report",
                    href: "/report-upload"
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyReports;