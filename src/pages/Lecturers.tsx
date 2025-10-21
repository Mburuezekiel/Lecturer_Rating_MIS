import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { lecturers, departments, calculateStats } from "@/lib/dummyData";
import Layout from "@/components/Layout";
import StarRating from "@/components/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Mail } from "lucide-react";

const Lecturers = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const stats = calculateStats();

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "hod")) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (!user) return null;

  const filteredLecturers = stats.lecturerStats.filter((lecturer) => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || lecturer.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const getPerformanceBadge = (rating: number) => {
    if (rating >= 4.5) return <Badge className="bg-success">Excellent</Badge>;
    if (rating >= 3.5) return <Badge className="bg-info">Good</Badge>;
    if (rating >= 2.5) return <Badge className="bg-warning">Average</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Lecturer Management</h1>
          <p className="text-muted-foreground">
            View and manage lecturer information and performance ratings
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Lecturers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lecturers Table view  */}
        <Card>
          <CardHeader>
            <CardTitle>Lecturers ({filteredLecturers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLecturers.map((lecturer) => (
                    <TableRow key={lecturer.id}>
                      <TableCell className="font-medium">{lecturer.id}</TableCell>
                      <TableCell className="font-medium">{lecturer.name}</TableCell>
                      <TableCell>{lecturer.department}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {lecturer.courses.slice(0, 2).join(", ")}
                        {lecturer.courses.length > 2 && "..."}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StarRating rating={Math.round(lecturer.avgRating)} readonly size="sm" />
                          <span className="text-sm font-medium">{lecturer.avgRating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lecturer.totalEvaluations}</Badge>
                      </TableCell>
                      <TableCell>{getPerformanceBadge(lecturer.avgRating)}</TableCell>
                      <TableCell>
                        <a 
                          href={`mailto:${lecturer.email}`}
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Department Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.departmentStats.map((dept) => (
                <div key={dept.department} className="p-4 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">{dept.department}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={Math.round(dept.avgRating)} readonly size="sm" />
                    <span className="text-sm font-bold">{dept.avgRating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.lecturers} lecturers</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Lecturers;
