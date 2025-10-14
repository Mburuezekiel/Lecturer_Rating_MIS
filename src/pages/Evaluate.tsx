import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { lecturers } from "@/lib/dummyData";
import Layout from "@/components/Layout";
import StarRating from "@/components/StarRating";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const Evaluate = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [ratings, setRatings] = useState({
    punctuality: 0,
    clarity: 0,
    engagement: 0,
    fairness: 0,
    communication: 0,
  });
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLecturer) {
      toast.error("Please select a lecturer");
      return;
    }

    if (Object.values(ratings).some(r => r === 0)) {
      toast.error("Please rate all criteria");
      return;
    }

    // Simulate submission
    toast.success("Evaluation submitted successfully!", {
      description: "Thank you for your feedback!",
    });

    // Reset form
    setSelectedLecturer("");
    setRatings({
      punctuality: 0,
      clarity: 0,
      engagement: 0,
      fairness: 0,
      communication: 0,
    });
    setComment("");
  };

  if (!user || user.role !== "student") return null;

  const selectedLecturerData = lecturers.find(l => l.id === selectedLecturer);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Evaluate Lecturer</h1>
          <p className="text-muted-foreground">
            Your honest feedback helps improve teaching quality and educational experience
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Submit Your Evaluation</CardTitle>
            <CardDescription>
              Rate your lecturer on multiple criteria. All ratings are anonymous.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Lecturer Selection */}
              <div className="space-y-2">
                <Label>Select Lecturer</Label>
                <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {lecturers.map((lecturer) => (
                      <SelectItem key={lecturer.id} value={lecturer.id}>
                        {lecturer.name} - {lecturer.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedLecturerData && (
                  <p className="text-sm text-muted-foreground">
                    Courses: {selectedLecturerData.courses.join(", ")}
                  </p>
                )}
              </div>

              {/* Rating Criteria */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-4">Rating Criteria</h3>
                
                {[
                  { key: "punctuality", label: "Punctuality", desc: "Always on time for classes" },
                  { key: "clarity", label: "Clarity of Explanation", desc: "Explains concepts clearly" },
                  { key: "engagement", label: "Student Engagement", desc: "Keeps students engaged" },
                  { key: "fairness", label: "Fairness in Assessment", desc: "Fair grading and evaluation" },
                  { key: "communication", label: "Communication Skills", desc: "Effective communication" },
                ].map((criterion) => (
                  <div key={criterion.key} className="flex items-start justify-between gap-4 p-3 bg-card rounded-lg">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">{criterion.label}</Label>
                      <p className="text-xs text-muted-foreground">{criterion.desc}</p>
                    </div>
                    <StarRating
                      rating={ratings[criterion.key as keyof typeof ratings]}
                      onRatingChange={(rating) => 
                        setRatings(prev => ({ ...prev, [criterion.key]: rating }))
                      }
                      size="lg"
                    />
                  </div>
                ))}
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <Label htmlFor="comment">Additional Comments (Optional)</Label>
                <Textarea
                  id="comment"
                  placeholder="Share specific feedback or suggestions..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Your comments remain anonymous and help lecturers improve
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Submit Evaluation
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setSelectedLecturer("");
                    setRatings({
                      punctuality: 0,
                      clarity: 0,
                      engagement: 0,
                      fairness: 0,
                      communication: 0,
                    });
                    setComment("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-l-4 border-l-info">
          <CardHeader>
            <CardTitle className="text-lg">Why Your Feedback Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Helps lecturers understand their strengths and areas for improvement</p>
            <p>✓ Contributes to better teaching quality across the institution</p>
            <p>✓ Informs administrative decisions on professional development</p>
            <p>✓ Creates a culture of continuous improvement in education</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Evaluate;
