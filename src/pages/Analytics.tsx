import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { calculateStats } from "@/lib/dummyData";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { TrendingUp, Award, AlertTriangle } from "lucide-react";

const Analytics = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const stats = calculateStats();

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "dean" && user.role !== "hod")) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Data for charts
  const departmentData = stats.departmentStats.map(d => ({
    name: d.department.split(' ')[0],
    rating: d.avgRating,
  }));

  const criteriaData = stats.criteriaStats;

  const performanceData = [
    { name: "Excellent", value: stats.performanceCategories.excellent, color: "hsl(var(--success))" },
    { name: "Good", value: stats.performanceCategories.good, color: "hsl(var(--info))" },
    { name: "Average", value: stats.performanceCategories.average, color: "hsl(var(--warning))" },
    { name: "Poor", value: stats.performanceCategories.poor, color: "hsl(var(--destructive))" },
  ];

  const topLecturers = stats.lecturerStats
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5)
    .map(l => ({ name: l.name.split(' ').pop(), rating: l.avgRating }));

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and data visualization for decision support
          </p>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Top 5 Performing Lecturers
            </CardTitle>
            <CardDescription>Highest rated lecturers based on student feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topLecturers}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Department Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
              <CardDescription>Average ratings across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="rating" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>Lecturers by performance category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Criteria Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Performance by Criteria
            </CardTitle>
            <CardDescription>Average scores across evaluation criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={criteriaData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="criterion" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Insights */}
        <Card className="border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Detailed Analysis & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.departmentStats.map((dept) => (
              <div key={dept.department} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{dept.department}</h3>
                  <span className="text-lg font-bold text-primary">{dept.avgRating}/5.0</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dept.avgRating >= 4.5 ? (
                    <>✓ Excellent performance. Consider showcasing best practices from this department.</>
                  ) : dept.avgRating >= 3.5 ? (
                    <>→ Good performance. Minor improvements in engagement could boost ratings.</>
                  ) : (
                    <>⚠ Requires attention. Recommend organizing training workshops and mentorship programs.</>
                  )}
                </p>
              </div>
            ))}

            <div className="p-4 bg-info/10 rounded-lg border border-info/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Overall Recommendation
              </h3>
              <p className="text-sm text-muted-foreground">
                Focus professional development on <strong>{stats.criteriaStats.sort((a, b) => a.average - b.average)[0].criterion.toLowerCase()}</strong> as 
                it shows the lowest average score. Consider peer observation programs and targeted 
                training to help lecturers in this area.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
