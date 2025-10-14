import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { calculateStats } from "@/lib/dummyData";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart3, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const stats = calculateStats();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const topLecturer = stats.lecturerStats.sort((a, b) => b.avgRating - a.avgRating)[0];
  const weakestCriterion = stats.criteriaStats.sort((a, b) => a.average - b.average)[0];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground">
            {user.role === "student" 
              ? "Review your lecturers and help improve teaching quality"
              : "Here's an overview of lecturer performance across the institution"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lecturers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lecturerStats.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {stats.departmentStats.length} departments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Evaluations</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvaluations}</div>
              <p className="text-xs text-muted-foreground">
                {stats.participationRate}% participation rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Excellent Performers</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.performanceCategories.excellent}</div>
              <p className="text-xs text-muted-foreground">
                Rating ≥ 4.5 out of 5.0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topLecturer.avgRating}</div>
              <p className="text-xs text-muted-foreground">
                {topLecturer.name}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Alerts */}
        {(user.role === "admin" || user.role === "dean" || user.role === "hod") && (
          <Card className="border-l-4 border-l-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Key Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                <Badge variant="outline" className="bg-accent text-accent-foreground">
                  Top Performer
                </Badge>
                <p className="text-sm">
                  <strong>{topLecturer.name}</strong> from {topLecturer.department} achieved 
                  the highest rating of <strong>{topLecturer.avgRating}/5.0</strong>
                </p>
              </div>

              {stats.lecturerStats.filter(l => l.avgRating < 3.5).length > 0 && (
                <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                  <Badge variant="outline" className="bg-destructive text-destructive-foreground">
                    Attention
                  </Badge>
                  <p className="text-sm">
                    {stats.lecturerStats.filter(l => l.avgRating < 3.5).length} lecturer(s) 
                    scored below 3.5. Consider organizing professional development workshops.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                <Badge variant="outline" className="bg-warning text-warning-foreground">
                  Improvement Area
                </Badge>
                <p className="text-sm">
                  <strong>{weakestCriterion.criterion}</strong> is the weakest criterion 
                  with an average of <strong>{weakestCriterion.average}/5.0</strong>
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                <Badge variant="outline" className="bg-success text-success-foreground">
                  Participation
                </Badge>
                <p className="text-sm">
                  Current participation rate is <strong>{stats.participationRate}%</strong>.
                  {stats.participationRate < 70 
                    ? " Consider encouraging more students to participate." 
                    : " Excellent student engagement!"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Department Performance */}
        {(user.role === "admin" || user.role === "dean") && (
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Overview</CardTitle>
              <CardDescription>Average ratings across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.departmentStats
                  .sort((a, b) => b.avgRating - a.avgRating)
                  .map((dept) => (
                    <div key={dept.department} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{dept.department}</span>
                          <span className="text-sm font-bold text-primary">{dept.avgRating}/5.0</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-primary transition-all"
                            style={{ width: `${(dept.avgRating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <Badge variant="outline">{dept.lecturers} lecturers</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Student Quick Actions */}
        {user.role === "student" && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Evaluate your lecturers and contribute to improving education quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => navigate("/evaluate")}
                  className="p-6 text-left rounded-lg border border-border hover:border-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Submit Evaluation</h3>
                  <p className="text-sm text-muted-foreground">
                    Rate your lecturers and provide valuable feedback
                  </p>
                </button>

                <div className="p-6 rounded-lg border border-border bg-muted/30">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Your Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Your feedback helps improve teaching quality for all students
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
