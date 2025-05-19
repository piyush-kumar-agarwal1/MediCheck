
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import FileUpload from '@/components/reports/FileUpload';

const ReportUpload = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Upload Your Medical Report
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI will analyze your report and provide clear insights about your health. We support various report formats including PDFs and images.
              </p>
            </div>
            
            <FileUpload />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportUpload;
