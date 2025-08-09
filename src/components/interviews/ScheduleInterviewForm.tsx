import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Plus, Check, ChevronsUpDown, Upload, X, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  resume: z.any().refine((file) => file, "Resume is required"),
  phone: z.string().optional(),
  notifyOnExpiration: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Mock project data with dates for sorting
const allProjects = [
  { name: "Senior Frontend Developer Hiring Q1", lastActivity: new Date("2024-01-15") },
  { name: "Backend Developer Hiring Q1", lastActivity: new Date("2024-01-10") },
  { name: "Full Stack Developer Hiring", lastActivity: new Date("2024-01-08") },
  { name: "Junior Frontend Developer Hiring Q1", lastActivity: new Date("2024-01-05") },
  { name: "DevOps Engineer Hiring", lastActivity: new Date("2024-01-03") },
  { name: "Data Scientist Hiring Q2", lastActivity: new Date("2023-12-28") },
  { name: "Mobile App Developer Hiring", lastActivity: new Date("2023-12-25") },
  { name: "UI/UX Designer Hiring Q1", lastActivity: new Date("2023-12-20") },
  { name: "Product Manager Hiring Q2", lastActivity: new Date("2023-12-15") },
  { name: "QA Engineer Hiring", lastActivity: new Date("2023-12-10") },
].sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());

interface ScheduleInterviewFormProps {
  onSchedule?: (data: FormData & { resumeFile?: File }) => void;
}

export const ScheduleInterviewForm = ({ onSchedule }: ScheduleInterviewFormProps) => {
  const [open, setOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const { toast } = useToast();
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null);

  // Filter projects based on search or show latest 5 by default
  const filteredProjects = useMemo(() => {
    if (projectSearch.trim()) {
      return allProjects.filter(project =>
        project.name.toLowerCase().includes(projectSearch.toLowerCase())
      );
    }
    // Show latest 5 projects by default
    return allProjects.slice(0, 5);
  }, [projectSearch]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = (data: FormData) => {
    // Check if resume file is selected since it's required
    if (!selectedFile) {
      form.setError("resume", { message: "Resume is required" });
      return;
    }

    const scheduleData = {
      ...data,
      resumeFile: selectedFile,
    };

    onSchedule?.(scheduleData);

    // Reset form but don't close dialog
    form.reset();
    setSelectedFile(null);

    toast({
      title: "Interview Scheduled",
      description: `Interview scheduled for ${data.firstName} ${data.lastName}`,
    });
  };

  const handleReset = () => {
    form.reset();
    setSelectedFile(null);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    form.reset();
    setSelectedFile(null);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Interview
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] h-full overflow-y-auto" side="right">
        <SheetHeader className="bg-gradient-to-r from-primary/10 to-primary/5 -m-6 p-6 mb-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-primary">Schedule New Interview</SheetTitle>
          </div>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Project Name and Email in same row */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-start">
              {/* Project Name */}
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-primary font-medium">Project Name</FormLabel>
                    <Popover open={projectOpen} onOpenChange={setProjectOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            ref={setTriggerRef}
                            variant="outline"
                            role="combobox"
                            aria-expanded={projectOpen}
                            className="w-full justify-between hover:bg-primary/5 border-primary/20"
                          >
                            {field.value || "Select project..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 bg-popover border border-border shadow-lg"
                        style={{ width: triggerRef?.offsetWidth }}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search projects..."
                            value={projectSearch}
                            onValueChange={setProjectSearch}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {projectSearch ? "No projects match your search." : "No projects available."}
                            </CommandEmpty>
                            <CommandGroup>
                              {!projectSearch && (
                                <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border">
                                  Latest 5 projects
                                </div>
                              )}
                              {filteredProjects.map((project) => (
                                <CommandItem
                                  key={project.name}
                                  value={project.name}
                                  onSelect={() => {
                                    field.onChange(project.name);
                                    setProjectOpen(false);
                                    setProjectSearch("");
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === project.name ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div className="flex flex-col">
                                    <span>{project.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      Last activity: {project.lastActivity.toLocaleDateString()}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                              {projectSearch && filteredProjects.length > 0 && (
                                <div className="px-2 py-1.5 text-xs text-muted-foreground border-t border-border">
                                  {filteredProjects.length} result{filteredProjects.length === 1 ? '' : 's'} found
                                </div>
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-primary font-medium">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        {...field}
                        className="border-primary/20 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
                        {...field}
                        className="border-primary/20 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
                        {...field}
                        className="border-primary/20 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Resume Upload */}
            <FormField
              control={form.control}
              name="resume"
              render={() => (
                <FormItem>
                  <FormLabel className="text-primary font-medium">Resume</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="default"
                          onClick={() => document.getElementById('resume-upload')?.click()}
                          className="flex items-center gap-2 bg-primary/5 border-primary/30 hover:bg-primary/10 text-primary"
                        >
                          <Upload className="h-4 w-4" />
                          {selectedFile ? 'Change Resume' : 'Upload Resume'}
                        </Button>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <span className="text-sm text-muted-foreground">PDF, DOC, DOCX (max 10MB)</span>
                      </div>

                      {selectedFile && (
                        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-md">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm font-medium text-primary">
                              {selectedFile.name}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeFile}
                            className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-medium">Phone Number <span className="text-muted-foreground">(Optional)</span></FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={field.onChange}
                      defaultCountry="US"
                      className="flex h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Advanced Configurations */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center justify-between w-full p-0 h-auto font-medium text-primary hover:bg-transparent"
                >
                  <span>Advanced Configurations</span>
                  {advancedOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-4">
                <div className="border-l-2 border-primary/20 pl-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="notifyOnExpiration"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-foreground">
                            Notify candidate when invite link is nearing expiration
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Send an email reminder to the candidate 24 hours before the interview link expires
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Form Actions */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" className="flex-1">
                Schedule Interview
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};