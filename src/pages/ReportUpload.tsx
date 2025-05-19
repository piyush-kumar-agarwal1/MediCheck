import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import FileUpload from '@/components/reports/FileUpload';
import ManualEntry from '@/components/reports/ManualEntry';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from 'react';

const ReportUpload = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);   

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Upload Your Medical Report
                Submit Your Health Data
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI will analyze your report and provide clear insights about your health. We support various report formats including PDFs and images.
                Our AI will analyze your health data and provide clear insights. Choose how you'd like to submit your information below.
              </p>
            </div>

            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upload">Upload Report</TabsTrigger>
                <TabsTrigger value="manual">Enter Manually</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="animate-fade-in">
                <FileUpload />
              </TabsContent>
              <TabsContent value="manual" className="animate-fade-in">
                <ManualEntry />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportUpload;