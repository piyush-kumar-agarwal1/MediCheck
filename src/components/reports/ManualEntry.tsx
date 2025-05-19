import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const reportSchema = z.object({
  glucose: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: 'Must be a valid number' })
    .refine(val => parseFloat(val) >= 50 && parseFloat(val) <= 400, { 
      message: 'Value should be between 50-400 mg/dL'
    }),
  hemoglobin: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: 'Must be a valid number' })
    .refine(val => parseFloat(val) >= 5 && parseFloat(val) <= 20, { 
      message: 'Value should be between 5-20 g/dL'
    }),
  cholesterol: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: 'Must be a valid number' })
    .refine(val => parseFloat(val) >= 100 && parseFloat(val) <= 500, { 
      message: 'Value should be between 100-500 mg/dL'
    }),
  bloodPressureSystolic: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: 'Must be a valid number' })
    .refine(val => parseFloat(val) >= 80 && parseFloat(val) <= 200, { 
      message: 'Value should be between 80-200 mmHg'
    }),
  bloodPressureDiastolic: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: 'Must be a valid number' })
    .refine(val => parseFloat(val) >= 50 && parseFloat(val) <= 120, { 
      message: 'Value should be between 50-120 mmHg'
    }),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const ManualEntry = () => {
  const navigate = useNavigate();
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      glucose: '',
      hemoglobin: '',
      cholesterol: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
    },
  });

  const onSubmit = (data: ReportFormValues) => {
    // Convert form data to the expected format
    const reportData = {
      biomarkers: {
        glucose: { value: parseFloat(data.glucose), unit: 'mg/dL' },
        hemoglobin: { value: parseFloat(data.hemoglobin), unit: 'g/dL' },
        cholesterol: { value: parseFloat(data.cholesterol), unit: 'mg/dL' },
        bloodPressure: { 
          systolic: parseFloat(data.bloodPressureSystolic), 
          diastolic: parseFloat(data.bloodPressureDiastolic),
          unit: 'mmHg'
        }
      }
    };

    // Simulate saving the data
    console.log('Report data:', reportData);
    
    // Show success message and navigate
    toast.success("Health data submitted successfully!");
    setTimeout(() => {
      navigate('/report-results');
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Enter Your Health Data</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="glucose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Glucose (mg/dL)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 95" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hemoglobin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hemoglobin (g/dL)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 14.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cholesterol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cholesterol (mg/dL)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 180" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="bloodPressureSystolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure - Systolic (mmHg)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 120" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bloodPressureDiastolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure - Diastolic (mmHg)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-primary-500 hover:bg-primary-600"
              >
                Submit and Analyze Data
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Understanding Your Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700">Glucose</h4>
            <p className="text-sm text-gray-600">Normal range: 70-99 mg/dL (fasting)</p>
            <p className="text-xs text-gray-500 mt-1">Measures blood sugar levels and helps screen for diabetes</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700">Hemoglobin</h4>
            <p className="text-sm text-gray-600">Normal range: 12-18 g/dL (varies by gender)</p>
            <p className="text-xs text-gray-500 mt-1">Indicates oxygen-carrying capacity of your blood</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700">Cholesterol</h4>
            <p className="text-sm text-gray-600">Normal range: Under 200 mg/dL (total)</p>
            <p className="text-xs text-gray-500 mt-1">Important for heart health assessment</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700">Blood Pressure</h4>
            <p className="text-sm text-gray-600">Normal range: Below 120/80 mmHg</p>
            <p className="text-xs text-gray-500 mt-1">Key indicator of cardiovascular health</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEntry;