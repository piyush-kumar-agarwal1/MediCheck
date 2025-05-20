import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { uploadReport, uploadManualReport } from '@/services/reportService';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import InfoTooltip from '@/components/ui/tooltip/InfoTooltip';
import FormProgressBar from '@/components/ui/FormProgressBar';
import ContextualHelp from '@/components/ui/ContextualHelp';
import FadeTransition from '@/components/ui/animations/FadeTransition';
const fileUploadSchema = z.object({
  reportName: z.string().min(3, "Report name must be at least 3 characters"),
  reportType: z.string().min(1, "Please select a report type"),
});

const manualEntrySchema = z.object({
  manualReportName: z.string().min(3, "Report name must be at least 3 characters"),
  manualReportType: z.string().min(1, "Please select a report type"),
  manualReportDate: z.string().optional(),
});

const ReportUpload = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('');
  const [manualReportType, setManualReportType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submittingManual, setSubmittingManual] = useState(false);
  
  // Manual entry form state
  const [manualReportName, setManualReportName] = useState('');
  const [manualReportDate, setManualReportDate] = useState('');
  
  // Blood work specific state
  const [bloodWorkData, setBloodWorkData] = useState({
    hemoglobin: '',
    wbc: '',
    rbc: '',
    platelets: '',
    glucose: '',
    totalCholesterol: '',
    hdl: '',
    ldl: '',
    triglycerides: '',
    notes: ''
  });
  
  // Physical exam specific state
  const [physicalExamData, setPhysicalExamData] = useState({
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    weight: '',
    height: '',
    bmi: '',
    temperature: '',
    oxygenSaturation: '',
    notes: ''
  });
  
  // Imaging specific state
  const [imagingData, setImagingData] = useState({
    imagingType: '',
    bodyRegion: '',
    findings: '',
    recommendations: ''
  });

  // Vaccination specific state
  const [vaccinationData, setVaccinationData] = useState({
    vaccineName: '',
    manufacturer: '',
    lotNumber: '',
    administrationDate: '',
    nextDoseDate: '',
    administeredBy: '',
    notes: ''
  });

  // Form validation for file upload
  const fileForm = useForm({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      reportName: "",
      reportType: "",
    },
  });

  // Form validation for manual entry
  const manualForm = useForm({
    resolver: zodResolver(manualEntrySchema),
    defaultValues: {
      manualReportName: "",
      manualReportType: "",
      manualReportDate: "",
    },
  });
  
  // Track validation errors
  const [formErrors, setFormErrors] = useState({});

  // Add validation functions for specific field types
  const validateNumericField = (value, fieldName, min, max) => {
    if (!value) return true; // Allow empty
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return `${fieldName} must be a number`;
    }
    if (min !== undefined && numValue < min) {
      return `${fieldName} must be at least ${min}`;
    }
    if (max !== undefined && numValue > max) {
      return `${fieldName} must be less than ${max}`;
    }
    return true;
  };

  // Handler for file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!reportName) {
        setReportName(file.name.split('.')[0]); // Set name from filename by default
      }
    }
  };

  // Handle file upload
  const handleUpload = async (data) => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', data.reportName || selectedFile.name);
      formData.append('type', data.reportType);

      // For demo purposes, simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Actual upload
      console.log("Starting file upload...");
      const result = await uploadReport(formData);
      console.log("Upload response:", result);
      
      clearInterval(interval);
      setUploadProgress(100);

      toast({
        title: "Success",
        description: "Report uploaded and being analyzed!",
      });

      // Redirect to the report page
      setTimeout(() => {
        navigate(`/report/${result.reportId}`);
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle manual data submission
  const handleManualSubmit = async (data) => {
    try {
      setSubmittingManual(true);
      
      let reportData = {
        title: data.manualReportName,
        type: data.manualReportType,
        date: data.manualReportDate || new Date().toISOString().split('T')[0],
      };
      
      // Validate specific fields based on report type
      let hasError = false;
      const errors = {};
      
      // Add specific data based on report type with validation
      switch (data.manualReportType) {
        case 'blood_work':
          // Validate blood work fields
          if (bloodWorkData.glucose && 
              validateNumericField(bloodWorkData.glucose, 'Glucose', 0, 1000) !== true) {
            errors.glucose = validateNumericField(bloodWorkData.glucose, 'Glucose', 0, 1000);
            hasError = true;
          }
          
          // Add more validations for other blood work fields
          ['hemoglobin', 'wbc', 'rbc', 'platelets', 'totalCholesterol', 'hdl', 'ldl', 'triglycerides']
            .forEach(field => {
              if (bloodWorkData[field] && 
                  validateNumericField(bloodWorkData[field], field, 0, field === 'hdl' ? 150 : 1000) !== true) {
                errors[field] = validateNumericField(bloodWorkData[field], field, 0, field === 'hdl' ? 150 : 1000);
                hasError = true;
              }
            });
          
          reportData = { ...reportData, biomarkers: bloodWorkData };
          break;
          
        case 'physical_exam':
          // Validate physical exam fields
          ['systolicBP', 'diastolicBP', 'heartRate', 'weight', 'height', 'temperature']
            .forEach(field => {
              if (physicalExamData[field] && 
                  validateNumericField(physicalExamData[field], field, 0, 500) !== true) {
                errors[field] = validateNumericField(physicalExamData[field], field, 0, 500);
                hasError = true;
              }
            });
          
          reportData = { ...reportData, examination: physicalExamData };
          break;
          
        case 'imaging':
          reportData = { ...reportData, imaging: imagingData };
          break;
          
        case 'vaccination':
          reportData = { ...reportData, vaccination: vaccinationData };
          break;
      }
      
      if (hasError) {
        setFormErrors(errors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Report data:", reportData);
      
      // Submit manual report
      const result = await uploadManualReport(reportData);
      console.log("Manual upload response:", result);
      
      toast({
        title: "Success",
        description: "Report data saved and being analyzed!",
      });
      
      // Redirect to the report page
      setTimeout(() => {
        navigate(`/report/${result.reportId}`);
      }, 1000);
    } catch (error) {
      console.error('Manual submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSubmittingManual(false);
    }
  };

  // Handler for blood work data changes
  const handleBloodWorkChange = (field: string, value: string) => {
    setBloodWorkData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handler for physical exam data changes
  const handlePhysicalExamChange = (field: string, value: string) => {
    setPhysicalExamData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handler for imaging data changes
  const handleImagingChange = (field: string, value: string) => {
    setImagingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handler for vaccination data changes
  const handleVaccinationChange = (field: string, value: string) => {
    setVaccinationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Render fields based on selected report type
  const renderManualFields = () => {
    switch (manualReportType) {
      case 'blood_work':
        return (
          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-lg">Blood Work Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                <Input 
                  id="hemoglobin" 
                  placeholder="e.g., 14.0" 
                  type="number"
                  step="0.1" 
                  value={bloodWorkData.hemoglobin}
                  onChange={(e) => handleBloodWorkChange('hemoglobin', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="wbc">White Blood Cell Count (k/µL)</Label>
                <Input 
                  id="wbc" 
                  placeholder="e.g., 7.5" 
                  type="number"
                  step="0.1" 
                  value={bloodWorkData.wbc}
                  onChange={(e) => handleBloodWorkChange('wbc', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="rbc">Red Blood Cell Count (M/µL)</Label>
                <Input 
                  id="rbc" 
                  placeholder="e.g., 5.0" 
                  type="number"
                  step="0.1" 
                  value={bloodWorkData.rbc}
                  onChange={(e) => handleBloodWorkChange('rbc', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="platelets">Platelets (k/µL)</Label>
                <Input 
                  id="platelets" 
                  placeholder="e.g., 250" 
                  type="number" 
                  value={bloodWorkData.platelets}
                  onChange={(e) => handleBloodWorkChange('platelets', e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                  <InfoTooltip content="Normal range is typically 70-100 mg/dL fasting" />
                </div>
                <Input 
                  id="glucose" 
                  placeholder="e.g., 85" 
                  type="number" 
                  value={bloodWorkData.glucose}
                  onChange={(e) => handleBloodWorkChange('glucose', e.target.value)}
                  className={formErrors.glucose ? "border-red-300" : ""}
                />
                {formErrors.glucose && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.glucose}</p>
                )}
              </div>
              <div>
                <Label htmlFor="totalCholesterol">Total Cholesterol (mg/dL)</Label>
                <Input 
                  id="totalCholesterol" 
                  placeholder="e.g., 180" 
                  type="number" 
                  value={bloodWorkData.totalCholesterol}
                  onChange={(e) => handleBloodWorkChange('totalCholesterol', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hdl">HDL Cholesterol (mg/dL)</Label>
                <Input 
                  id="hdl" 
                  placeholder="e.g., 60" 
                  type="number" 
                  value={bloodWorkData.hdl}
                  onChange={(e) => handleBloodWorkChange('hdl', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ldl">LDL Cholesterol (mg/dL)</Label>
                <Input 
                  id="ldl" 
                  placeholder="e.g., 100" 
                  type="number" 
                  value={bloodWorkData.ldl}
                  onChange={(e) => handleBloodWorkChange('ldl', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
                <Input 
                  id="triglycerides" 
                  placeholder="e.g., 150" 
                  type="number" 
                  value={bloodWorkData.triglycerides}
                  onChange={(e) => handleBloodWorkChange('triglycerides', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="blood-notes">Additional Notes</Label>
              <Textarea 
                id="blood-notes" 
                placeholder="Enter any additional information or context about this blood test" 
                value={bloodWorkData.notes}
                onChange={(e) => handleBloodWorkChange('notes', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'physical_exam':
        return (
          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-lg">Physical Examination Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systolicBP">Systolic Blood Pressure (mmHg)</Label>
                <Input 
                  id="systolicBP" 
                  placeholder="e.g., 120" 
                  type="number" 
                  value={physicalExamData.systolicBP}
                  onChange={(e) => handlePhysicalExamChange('systolicBP', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="diastolicBP">Diastolic Blood Pressure (mmHg)</Label>
                <Input 
                  id="diastolicBP" 
                  placeholder="e.g., 80" 
                  type="number" 
                  value={physicalExamData.diastolicBP}
                  onChange={(e) => handlePhysicalExamChange('diastolicBP', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input 
                  id="heartRate" 
                  placeholder="e.g., 72" 
                  type="number" 
                  value={physicalExamData.heartRate}
                  onChange={(e) => handlePhysicalExamChange('heartRate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  placeholder="e.g., 70" 
                  type="number"
                  step="0.1" 
                  value={physicalExamData.weight}
                  onChange={(e) => handlePhysicalExamChange('weight', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  placeholder="e.g., 175" 
                  type="number" 
                  value={physicalExamData.height}
                  onChange={(e) => handlePhysicalExamChange('height', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input 
                  id="bmi" 
                  placeholder="e.g., 22.9" 
                  type="number"
                  step="0.1" 
                  value={physicalExamData.bmi}
                  onChange={(e) => handlePhysicalExamChange('bmi', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="temperature">Body Temperature (°C)</Label>
                <Input 
                  id="temperature" 
                  placeholder="e.g., 36.8" 
                  type="number"
                  step="0.1" 
                  value={physicalExamData.temperature}
                  onChange={(e) => handlePhysicalExamChange('temperature', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                <Input 
                  id="oxygenSaturation" 
                  placeholder="e.g., 98" 
                  type="number" 
                  value={physicalExamData.oxygenSaturation}
                  onChange={(e) => handlePhysicalExamChange('oxygenSaturation', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="physical-notes">Examination Notes</Label>
              <Textarea 
                id="physical-notes" 
                placeholder="Enter physician's notes and observations" 
                value={physicalExamData.notes}
                onChange={(e) => handlePhysicalExamChange('notes', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'imaging':
        return (
          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-lg">Medical Imaging Results</h3>
            <div>
              <Label htmlFor="imagingType">Imaging Type</Label>
              <Select 
                value={imagingData.imagingType} 
                onValueChange={(value) => handleImagingChange('imagingType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select imaging type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xray">X-Ray</SelectItem>
                  <SelectItem value="mri">MRI</SelectItem>
                  <SelectItem value="ct">CT Scan</SelectItem>
                  <SelectItem value="ultrasound">Ultrasound</SelectItem>
                  <SelectItem value="mammogram">Mammogram</SelectItem>
                  <SelectItem value="dexa">DEXA Scan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bodyRegion">Body Region</Label>
              <Input 
                id="bodyRegion" 
                placeholder="e.g., Chest, Abdomen, Right Knee" 
                value={imagingData.bodyRegion}
                onChange={(e) => handleImagingChange('bodyRegion', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="findings">Findings</Label>
              <Textarea 
                id="findings" 
                placeholder="Enter detailed radiological findings" 
                className="min-h-[100px]"
                value={imagingData.findings}
                onChange={(e) => handleImagingChange('findings', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea 
                id="recommendations" 
                placeholder="Enter radiologist's recommendations" 
                value={imagingData.recommendations}
                onChange={(e) => handleImagingChange('recommendations', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'vaccination':
        return (
          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-lg">Vaccination Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vaccineName">Vaccine Name</Label>
                <Input 
                  id="vaccineName" 
                  placeholder="e.g., Influenza, COVID-19, Tetanus" 
                  value={vaccinationData.vaccineName}
                  onChange={(e) => handleVaccinationChange('vaccineName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input 
                  id="manufacturer" 
                  placeholder="e.g., Pfizer, Moderna, GSK" 
                  value={vaccinationData.manufacturer}
                  onChange={(e) => handleVaccinationChange('manufacturer', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lotNumber">Lot Number</Label>
                <Input 
                  id="lotNumber" 
                  placeholder="e.g., AB1234" 
                  value={vaccinationData.lotNumber}
                  onChange={(e) => handleVaccinationChange('lotNumber', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="administrationDate">Administration Date</Label>
                <Input 
                  id="administrationDate" 
                  type="date"
                  value={vaccinationData.administrationDate}
                  onChange={(e) => handleVaccinationChange('administrationDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nextDoseDate">Next Dose Date (if applicable)</Label>
                <Input 
                  id="nextDoseDate" 
                  type="date"
                  value={vaccinationData.nextDoseDate}
                  onChange={(e) => handleVaccinationChange('nextDoseDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="administeredBy">Administered By</Label>
                <Input 
                  id="administeredBy" 
                  placeholder="e.g., Dr. Smith, City Hospital" 
                  value={vaccinationData.administeredBy}
                  onChange={(e) => handleVaccinationChange('administeredBy', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="vaccination-notes">Additional Notes</Label>
              <Textarea 
                id="vaccination-notes" 
                placeholder="Enter any reactions, side effects, or additional information" 
                value={vaccinationData.notes}
                onChange={(e) => handleVaccinationChange('notes', e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">Please select a report type to see relevant fields</p>
          </div>
        );
    }
  };

  // Add activeStep state to track current step
  const [activeStep, setActiveStep] = useState('info');

  // Define form progress steps
  const formSteps = [
    { id: 'info', label: 'Basic Info', isComplete: Boolean(reportName && reportType) },
    { id: 'upload', label: 'Upload', isComplete: Boolean(selectedFile) },
    { id: 'confirm', label: 'Confirm', isComplete: false },
  ];

  // For manual entry
  const manualFormSteps = [
    { id: 'info', label: 'Basic Info', isComplete: Boolean(manualReportName && manualReportType) },
    { id: 'details', label: 'Report Details', isComplete: Boolean(manualReportType && 
      (manualReportType === 'blood_work' ? Object.values(bloodWorkData).some(v => v) : 
       manualReportType === 'physical_exam' ? Object.values(physicalExamData).some(v => v) :
       manualReportType === 'imaging' ? Object.values(imagingData).some(v => v) :
       manualReportType === 'vaccination' ? Object.values(vaccinationData).some(v => v) : false)
    )},
    { id: 'confirm', label: 'Review', isComplete: false },
  ];

  // Add contextual help items
  const helpItems = [
    {
      id: 'reportType',
      title: 'Report Type',
      content: 'Select the type of medical report to ensure accurate analysis of your data.',
      priority: 1
    },
    {
      id: 'file',
      title: 'Supported Files',
      content: 'Upload PDF, JPG or PNG files of your medical reports. Maximum size is 10MB.',
      priority: 2
    },
    {
      id: 'glucose',
      title: 'Blood Glucose',
      content: 'Normal fasting blood glucose is typically between 70-100 mg/dL. Values above 125 mg/dL may indicate diabetes.',
      priority: 3
    },
    {
      id: 'cholesterol',
      title: 'Cholesterol Levels',
      content: 'Total cholesterol below 200 mg/dL is desirable. HDL ("good") cholesterol should be above 40 mg/dL.',
      priority: 3
    },
    {
      id: 'blood_pressure',
      title: 'Blood Pressure',
      content: 'Normal blood pressure is below 120/80 mmHg. Values above 140/90 mmHg indicate hypertension.',
      priority: 3
    },
    {
      id: 'hemoglobin',
      title: 'Hemoglobin',
      content: 'Normal hemoglobin range is typically 13.5-17.5 g/dL for men and 12-15.5 g/dL for women.',
      priority: 4
    }
  ];

  // Update useEffect to handle step changes
  useEffect(() => {
    // Update activeStep based on form progress
    if (activeTab === 'file') {
      if (!reportName && !reportType) {
        setActiveStep('info');
      } else if (!selectedFile) {
        setActiveStep('upload');
      } else {
        setActiveStep('confirm');
      }
    }
  }, [reportName, reportType, selectedFile, activeTab]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
                  Upload Medical Report
                </h1>
                <p className="text-gray-600">
                  Upload your medical reports for analysis or enter details manually
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 border-gray-300"
              >
                Back to Dashboard
              </Button>
            </div>
            
            <div className="mb-6">
              <FormProgressBar
                steps={activeTab === 'file' ? formSteps : manualFormSteps}
                currentStepId={activeStep}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>
                
                <TabsContent value="file" className="space-y-6">
                  {/* File upload form */}
                  <Form {...fileForm}>
                    <form onSubmit={fileForm.handleSubmit(handleUpload)} className="space-y-6">
                      {activeStep === 'info' && (
                        <FadeTransition show={true}>
                          <div className="space-y-6">
                            <FormField
                              control={fileForm.control}
                              name="reportName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Report Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., Annual Blood Work 2023" 
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setReportName(e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={fileForm.control}
                              name="reportType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Report Type</FormLabel>
                                  <Select
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setReportType(value);
                                    }}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a report type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="blood_work">Blood Work</SelectItem>
                                      <SelectItem value="physical_exam">Physical Examination</SelectItem>
                                      <SelectItem value="imaging">Medical Imaging</SelectItem>
                                      <SelectItem value="vaccination">Vaccination Record</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                onClick={() => setActiveStep('upload')}
                                disabled={!reportName || !reportType}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </FadeTransition>
                      )}
                      
                      {activeStep === 'upload' && (
                        <FadeTransition show={true}>
                          <div className="space-y-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                              <Input
                                type="file"
                                id="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                              <label htmlFor="file" className="cursor-pointer">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                  <div className="rounded-full bg-primary-50 p-3">
                                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-base font-medium text-gray-800">
                                      {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      PDF, JPG or PNG (max. 10MB)
                                    </p>
                                  </div>
                                </div>
                              </label>
                            </div>
                            
                            <div className="flex justify-between">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setActiveStep('info')}
                              >
                                Back
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setActiveStep('confirm')}
                                disabled={!selectedFile}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </FadeTransition>
                      )}
                      
                      {activeStep === 'confirm' && (
                        <FadeTransition show={true}>
                          <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h3 className="font-medium text-lg mb-4">Confirm Submission</h3>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-500">Report Name</p>
                                  <p className="text-gray-800">{reportName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Report Type</p>
                                  <p className="text-gray-800">
                                    {reportType === 'blood_work' ? 'Blood Work' : 
                                     reportType === 'physical_exam' ? 'Physical Examination' : 
                                     reportType === 'imaging' ? 'Medical Imaging' : 
                                     reportType === 'vaccination' ? 'Vaccination Record' : 'Other'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">File</p>
                                  <p className="text-gray-800">{selectedFile?.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Size</p>
                                  <p className="text-gray-800">
                                    {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {uploading && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Uploading...</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <Progress value={uploadProgress} />
                              </div>
                            )}
                            
                            <div className="flex justify-between">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setActiveStep('upload')}
                                disabled={uploading}
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                disabled={uploading}
                              >
                                {uploading ? (
                                  <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                  </div>
                                ) : (
                                  'Upload and Analyze'
                                )}
                              </Button>
                            </div>
                          </div>
                        </FadeTransition>
                      )}
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="manual" className="space-y-6">
                  {/* Manual entry form */}
                  <Form {...manualForm}>
                    <form onSubmit={manualForm.handleSubmit(handleManualSubmit)} className="space-y-6">
                      {activeStep === 'info' && (
                        <FadeTransition show={true}>
                          <div className="space-y-6">
                            <FormField
                              control={manualForm.control}
                              name="manualReportName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Report Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., Annual Blood Work 2023" 
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setManualReportName(e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={manualForm.control}
                              name="manualReportType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Report Type</FormLabel>
                                  <Select
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setManualReportType(value);
                                    }}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a report type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="blood_work">Blood Work</SelectItem>
                                      <SelectItem value="physical_exam">Physical Examination</SelectItem>
                                      <SelectItem value="imaging">Medical Imaging</SelectItem>
                                      <SelectItem value="vaccination">Vaccination Record</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={manualForm.control}
                              name="manualReportDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Report Date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="date" 
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setManualReportDate(e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    When was this test or examination performed?
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                onClick={() => setActiveStep('details')}
                                disabled={!manualReportName || !manualReportType}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </FadeTransition>
                      )}
                      
                      {activeStep === 'details' && (
                        <FadeTransition show={true}>
                          <div className="space-y-6">
                            {renderManualFields()}
                            
                            <div className="flex justify-between">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setActiveStep('info')}
                              >
                                Back
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setActiveStep('confirm')}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </FadeTransition>
                      )}
                      
                      {activeStep === 'confirm' && (
                        <FadeTransition show={true}>
                          <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h3 className="font-medium text-lg mb-4">Confirm Submission</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Report Name</p>
                                  <p className="text-gray-800">{manualReportName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Report Type</p>
                                  <p className="text-gray-800">
                                    {manualReportType === 'blood_work' ? 'Blood Work' : 
                                     manualReportType === 'physical_exam' ? 'Physical Examination' : 
                                     manualReportType === 'imaging' ? 'Medical Imaging' : 
                                     manualReportType === 'vaccination' ? 'Vaccination Record' : 'Other'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Date</p>
                                  <p className="text-gray-800">
                                    {manualReportDate || new Date().toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setActiveStep('details')}
                                disabled={submittingManual}
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                disabled={submittingManual}
                              >
                                {submittingManual ? (
                                  <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                  </div>
                                ) : (
                                  'Submit and Analyze'
                                )}
                              </Button>
                            </div>
                          </div>
                        </FadeTransition>
                      )}
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
            
              <div className="lg:col-span-1">
              <div>
                <ContextualHelp
                    formState={activeTab === 'file' ? 
                      { reportType, reportName, file: selectedFile } : 
                      { manualReportType, manualReportName, biomarkers: bloodWorkData }
                    }
                    formErrors={formErrors}
                    helpItems={helpItems}
                  />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportUpload;