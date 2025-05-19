
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (uploadedFile: File) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];
    if (!allowedTypes.includes(uploadedFile.type)) {
      toast.error("Invalid file type. Please upload a PDF or image.");
      return;
    }
    
    // Check file size (max 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }
    
    setFile(uploadedFile);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    const totalTime = 3000;
    const interval = 100;
    const steps = totalTime / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const progress = Math.round((currentStep / steps) * 100);
      setUploadProgress(progress);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setIsUploading(false);
        
        // Simulate a delay before navigation to show completion
        setTimeout(() => {
          toast.success("Report uploaded successfully! Analyzing...");
          navigate('/report-results');
        }, 500);
      }
    }, interval);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.tiff"
          className="hidden"
        />
        
        {!file ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="mb-2 text-lg font-semibold text-gray-700">Drag and drop your medical report</p>
            <p className="mb-4 text-sm text-gray-500">
              Supported formats: PDF, JPG, PNG, TIFF <br />
              (Max file size: 10MB)
            </p>
            <Button 
              onClick={openFileDialog}
              className="bg-primary-500 hover:bg-primary-600"
            >
              Select File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={clearFile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {isUploading ? (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 text-center">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button 
                  onClick={handleUpload}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  Upload and Analyze Report
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens after upload?</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
              1
            </div>
            <p className="text-gray-600">Our AI analyzes your medical report and extracts key information</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
              2
            </div>
            <p className="text-gray-600">Results are presented in easy-to-understand visual formats</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
              3
            </div>
            <p className="text-gray-600">You'll receive personalized insights and recommendations</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
              4
            </div>
            <p className="text-gray-600">All data is securely stored and accessible only to you</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
