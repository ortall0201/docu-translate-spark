import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TranslationProgress } from '@/components/TranslationProgress';
import { StepIndicator } from '@/components/StepIndicator';
import { TranslateButton } from '@/components/TranslateButton';
import heroImage from '@/assets/hero-illustration.jpg';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('pl');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedFile, setTranslatedFile] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const getCurrentStep = () => {
    if (translatedFile) return 3;
    if (isTranslating) return 2;
    if (selectedFile && selectedLanguage) return 1;
    if (selectedFile) return 1;
    return 0;
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setTranslatedFile(null);
    if (file) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleTranslate = async () => {
    if (!selectedFile || !selectedLanguage) return;
    
    setIsTranslating(true);
    setCurrentStep(2);
    
    try {
      // Simulate translation process
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      // Create a mock translated file URL
      const mockTranslatedUrl = URL.createObjectURL(new Blob(['Mock translated content'], { type: 'application/pdf' }));
      setTranslatedFile(mockTranslatedUrl);
      setCurrentStep(3);
      
      toast({
        title: "Translation completed!",
        description: "Your document has been successfully translated.",
      });
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "There was an error translating your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = () => {
    if (translatedFile && selectedFile) {
      const link = document.createElement('a');
      link.href = translatedFile;
      link.download = selectedFile.name.replace('.pdf', '_translated.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your translated document is being downloaded.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Docs Translator</h1>
              <p className="text-sm text-muted-foreground">Professional document translation made simple</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Translate Documents
                  <span className="block text-transparent bg-gradient-primary bg-clip-text">
                    Instantly & Accurately
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Upload your PDF documents and get professional translations in multiple languages. 
                  Powered by advanced AI technology while preserving your document's original formatting.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-foreground">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
                  <div className="w-2 h-2 bg-tech-blue rounded-full"></div>
                  <span className="text-foreground">Format Preserved</span>
                </div>
                <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-foreground">Lightning Fast</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Document translation illustration" 
                className="relative w-full h-auto rounded-2xl shadow-strong floating-animation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <StepIndicator currentStep={getCurrentStep()} />
        
        <div className="space-y-8">
          {/* Step 1: File Upload */}
          <FileUpload 
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            isProcessing={isTranslating}
          />
          
          {/* Step 2: Language Selection */}
          {selectedFile && (
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              disabled={isTranslating}
            />
          )}
          
          {/* Step 3: Translate Button */}
          {selectedFile && selectedLanguage && (
            <TranslateButton
              onTranslate={handleTranslate}
              disabled={!selectedFile || !selectedLanguage}
              isTranslating={isTranslating}
            />
          )}
          
          {/* Step 4: Translation Progress & Download */}
          <TranslationProgress
            isTranslating={isTranslating}
            translatedFile={translatedFile}
            onDownload={handleDownload}
            fileName={selectedFile?.name || ''}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Docs Translator. Professional document translation powered by advanced AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
