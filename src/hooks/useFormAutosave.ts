import { useState, useEffect } from 'react';

interface AutosaveOptions {
  onSave: (data: any) => Promise<void>;
  saveInterval?: number;
  minIntervalBetweenSaves?: number;
  enabled?: boolean;
}

export const useFormAutosave = (
  formData: any,
  {
    onSave,
    saveInterval = 3000,
    minIntervalBetweenSaves = 2000,
    enabled = true
  }: AutosaveOptions
) => {
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState(null);
  const [saveError, setSaveError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Don't auto-save if we're already saving
    if (isSaving) return;
    
    // Don't save if form data hasn't changed
    if (JSON.stringify(formData) === JSON.stringify(lastSavedData)) return;

    const now = Date.now();
    
    // Check if we haven't saved for the saveInterval or if this is the first save
    if (lastSaveTime === null || now - lastSaveTime >= saveInterval) {
      const timeoutId = setTimeout(() => {
        saveForm();
      }, minIntervalBetweenSaves);
      
      return () => clearTimeout(timeoutId);
    }
  }, [formData, lastSaveTime, isSaving, enabled]);

  const saveForm = async () => {
    if (!enabled || isSaving) return;
    
    try {
      setIsSaving(true);
      setSaveError(null);
      await onSave(formData);
      setLastSavedData(formData);
      setLastSaveTime(Date.now());
    } catch (error) {
      setSaveError(error);
      console.error('Error saving form:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Force a save, ignoring limits
  const forceSave = async () => {
    if (!enabled) return;
    
    try {
      setIsSaving(true);
      setSaveError(null);
      await onSave(formData);
      setLastSavedData(formData);
      setLastSaveTime(Date.now());
    } catch (error) {
      setSaveError(error);
      console.error('Error force saving form:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    lastSaveTime,
    saveError,
    forceSave
  };
};