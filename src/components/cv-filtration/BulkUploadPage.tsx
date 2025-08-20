import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
}

export const BulkUploadPage = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Mock projects data
  const projects: Project[] = [
    { id: "1", name: "Frontend Developer Hiring" },
    { id: "2", name: "Backend Engineer Recruitment" },
    { id: "3", name: "Full Stack Developer Search" },
    { id: "4", name: "DevOps Engineer Hiring" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf" || file.name.endsWith('.pdf')
    );

    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} CV(s) added for upload`);
    } else {
      toast.error("Please upload only PDF files");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === "application/pdf" || file.name.endsWith('.pdf')
    );

    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} CV(s) added for upload`);
    } else {
      toast.error("Please upload only PDF files");
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  const handleUpload = () => {
    if (!selectedProject) {
      toast.error("Please select a project");
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one CV");
      return;
    }

    // Mock upload process
    toast.success(`${uploadedFiles.length} CV(s) uploaded successfully for processing`);
    setUploadedFiles([]);
    setSelectedProject("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bulk Upload CVs</h1>
        <p className="text-muted-foreground mt-2">
          Upload multiple CVs for processing and analysis
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Selection</CardTitle>
          <CardDescription>
            Select the project to which these CVs belong
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload CVs</CardTitle>
          <CardDescription>
            Drag and drop PDF files or click to browse. Only PDF files are supported.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
              ${uploadedFiles.length > 0 ? "mb-6" : ""}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your CV files here</p>
              <p className="text-sm text-muted-foreground">or</p>
              <div>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">PDF files only, up to 10MB each</p>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">
                Selected Files ({uploadedFiles.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleUpload}
              disabled={!selectedProject || uploadedFiles.length === 0}
              className="min-w-32"
            >
              Upload CVs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/10">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Important Notes
              </p>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                <li>Only PDF files are supported for CV uploads</li>
                <li>Maximum file size is 10MB per CV</li>
                <li>Processing will extract name, email, contact number, and calculate JD match percentage</li>
                <li>You can process the uploaded CVs from the "View Uploaded CVs" section</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};