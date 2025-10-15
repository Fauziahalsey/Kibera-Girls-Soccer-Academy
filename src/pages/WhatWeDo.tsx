import soccer from "@/assets/soccer.jpeg";
import tennis from "@/assets/tennis.jpg";
import indoor from "@/assets/indoor.png";
import rugby from "@/assets/rugby.jpeg";
import netball from "@/assets/netball.jpg";
import grad from "@/assets/grad.jpg";
import ashaJaffar from "@/assets/asha-jaffar-class-of-2011-scaled.jpeg";
import vivy from "@/assets/vivy.jpeg";
import dalifa from "@/assets/dalifa.png";
import dramaClub from "@/assets/drama-club.jpg";
import journalism from "@/assets/20240830_145422.jpg";
import business from "@/assets/business.jpeg";
import drama from "@/assets/drama.jpeg";
import cosmetics from "@/assets/cosmetics.jpeg";
import sewing from "@/assets/sewing-class.jpg";
import computer from "@/assets/computer.jpg";
import nutrition from "@/assets/nutrition.jpg";
import socialWorker from "@/assets/social worker.jpg";
import pad from "@/assets/pad.jpeg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  GraduationCap, 
  Users, 
  Heart, 
  CircleDot, 
  Zap, 
  Gamepad2, 
  School, 
  Briefcase, 
  Drama, 
  Music, 
  Scissors, 
  Computer,
  UserCheck,
  Shield,
  Apple
} from "lucide-react";

const WhatWeDo = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">What We Do</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our comprehensive programs designed to nurture well-rounded students
          </p>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0"
          >
            <TabsTrigger value="games" className="text-xs md:text-base py-2">Games & Sports</TabsTrigger>
            <TabsTrigger value="education" className="text-xs md:text-base py-2">Higher Education</TabsTrigger>
            <TabsTrigger value="development" className="text-xs md:text-base py-2">Student Development</TabsTrigger>
            <TabsTrigger value="wellness" className="text-xs md:text-base py-2">Health & Wellness</TabsTrigger>
          </TabsList>

          {/* Games & Sports */}
          <TabsContent value="games" className="mt-8">
            <div className="mb-8">
              <img src={soccer} alt="Girls playing soccer" className="w-full h-60 md:h-84 object-cover rounded-lg shadow-card" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CircleDot className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Soccer</CardTitle>
              <img src={soccer} alt="Girls playing soccer" className="w-full h-64 object-cover rounded-lg shadow-card" />

                  <CardDescription>
                    Our football teams compete in inter-school tournaments and develop teamwork skills
                  </CardDescription>
                </CardHeader>
              
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="h-6 w-6 text-primary mr-2" />
                      
                      <CardTitle className="text-lg">Tennis</CardTitle>
                    </div>
                     <img src={tennis} alt="Girls playing tennis" className="w-full h-92 object-cover" style={{backgroundColor: 'black'}} />

                    <CardDescription>
                      Individual and doubles tennis coaching for students of all skill levels
                    </CardDescription>
                    
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Gamepad2 className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Indoor Games</CardTitle>
                   <img src={indoor} alt="Girls playing tennis" className="w-full h-92 object-cover" />

                  <CardDescription>
                    Chess, table tennis, badminton, and other indoor activities for all seasons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Chess Club</Badge>
                    <Badge variant="secondary">Table Tennis</Badge>
                    <Badge variant="secondary">Badminton</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                <img src={rugby} alt="Girls playing soccer" className="w-full h-64 object-cover rounded-lg shadow-card" />

                  <Trophy className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Rugby</CardTitle>
                  <CardDescription>
                    Building strength, strategy, and sportsmanship through rugby training and matches
                  </CardDescription>
                </CardHeader>
             
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-0">
                  <img src={netball} alt="Girls playing netball" className="w-full h-92 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-6 w-6 text-primary mr-2" />
                      <CardTitle className="text-lg">Netball</CardTitle>
                    </div>
                    <CardDescription>
                      Netball teams for girls developing coordination, strategy, and teamwork
                    </CardDescription>
                  
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Higher Education */}
          <TabsContent value="education" className="mt-8">
            <div className="mb-8">
              <img src={grad} alt="Students in classroom" className="w-full h-60 md:h-84 object-cover rounded-lg shadow-card" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
              <Card className="shadow-card">
                <CardHeader>
                  <School className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>College Preparation</CardTitle>
                  <CardDescription>
                    Comprehensive programs to prepare students for technical colleges and diploma courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Career guidance and counseling</li>
                    <li>• Application assistance</li>
                    <li>• Technical skills development</li>
                    <li>• Industry partnerships</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>University Preparation</CardTitle>
                  <CardDescription>
                    Academic excellence programs for university admission and scholarship opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• KCSE preparation intensive</li>
                    <li>• University application support</li>
                    <li>• Scholarship guidance</li>
                    <li>• Leadership development</li>
                  </ul>
                </CardContent>
              </Card>

                <Card className="shadow-card">
                <CardHeader>
                  {/* <GraduationCap className="h-12 w-12 text-primary mb-4" /> */}
                  <CardTitle>Kgsa Programs</CardTitle>
                  <CardDescription>
                    Academic excellence programs for university admission and scholarship opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• mentorship</li>
                    <li>• lifeskills</li>
                    <li>• wash</li>
                    <li>• youth empowerment</li>
                  </ul>
                </CardContent>
                     <div className="flex justify-center mt-6">
                  <a
                    href="https://drive.google.com/drive/folders/14LI1-VlFPOuHij9I3t83VXPWlyc3AA5F?usp=drive_link"
                    className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/80 transition-colors"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View All Photos
                  </a>
                </div>
              </Card>

              <Card className="shadow-card col-span-1 md:col-span-2">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>
                    Our alumni making a difference in various fields
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                                    <img src={ashaJaffar} alt="Students in classroom" className="w-full h-65 object-cover rounded-lg shadow-card" />

                      <h4 className="font-semibold">Asha Jaffar</h4>
                      <p className="text-sm text-muted-foreground">Asha received her Bachelor’s in 
                        Journalism from Moi University and currently works as a freelance journalist, 
                        producer, and social activist. She has been featured in
                         NYT and National Geographic and has worked for Clear 
                         Water Productions and the Foreign Correspondents’ Association of East Africa. 
                         Her awards include the Haller Prize for Development Journalism 
                        and the Africans Rising Activist of the Year.</p>
                      <Badge variant="outline" className="mt-2">Class of 2011</Badge>
                    </div>
                    <div className="text-center">
                      <img src={vivy} alt="Students in classroom" className="w-full h-94 object-cover rounded-lg shadow-card" />

                      <h4 className="font-semibold">Mercy</h4>
                      <p className="text-sm text-muted-foreground">Mercy participated in the Tailoring 
                        Club all four years at KGSA and is a talented seamstress. She completed a six month fashion design program at Passion to Share Foundation in Kibera. Mercy modeled the dresses she designed for her 
                        graduation ceremony from vocational school.</p>
                      <Badge variant="outline" className="mt-2">Class of 2022</Badge>
                    </div>
                    <div className="text-center">
                   <img src={dalifa} alt="Students in classroom" className="w-full h-65 object-cover rounded-lg shadow-card" />

                      <h4 className="font-semibold">Dalifa Hassan</h4>
                      <p className="text-sm text-muted-foreground">Dalifa grew up in the western part of Kenya in a town called Busia and graduated from KGSA in 2012. 
                        She received a Bachelor’s Degree in Education Science from Maseno 
                        University and teaches mathematics and Chemistry at KGSA. 
                        She loves mentoring and empowering the girls through education. 
                        KGSA provides a great platform for that.</p>
                      <Badge variant="outline" className="mt-2">Class of 2012</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Student Development */}
          <TabsContent value="development" className="mt-8">
            <div className="mb-8">
              <img src={dramaClub} alt="Students in drama club" className="w-full h-60 md:h-84 object-cover rounded-lg shadow-card" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <Briefcase className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Journalism Club</CardTitle>
                   <img src={journalism} alt="Students in drama club" className="w-full h-84 object-cover rounded-lg shadow-card" />

                  <CardDescription>
                    Developing communication skills through writing, reporting, and media production
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">School Newsletter</Badge>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Briefcase className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Business Club</CardTitle>
                                     <img src={business} alt="Students in classroom" className="w-full h-65 object-cover rounded-lg shadow-card" />

                  <CardDescription>
                    Entrepreneurship skills and business acumen development for future leaders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Young Entrepreneurs</Badge>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Drama className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Drama Club</CardTitle>
                   <img src={drama} alt="Students in classroom" className="w-full h-65 object-cover rounded-lg shadow-card" />

                  <CardDescription>
                    Creative expression through theater, performance, and storytelling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Annual Productions</Badge>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Music className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Music Club</CardTitle>
                  <img src={drama} alt="Students in classroom" className="w-full h-65 object-cover rounded-lg shadow-card" />

                  <CardDescription>
                    Musical talents development through choir, instruments, and composition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">School Choir</Badge>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Heart className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Beauty & Cosmetology</CardTitle>
                  <img src={cosmetics} alt="Students in classroom" className="w-full h-75 object-cover rounded-lg shadow-card" />

                  <CardDescription>
                    Professional beauty skills and self-confidence building programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Certification Course</Badge>
                </CardContent>
              </Card>

            

              <Card className="shadow-card">
                <CardContent className="p-0">
                  <img src={computer} alt="Girls in computer lab" className="w-full h-62 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Computer className="h-6 w-6 text-primary mr-2" />
                      <CardTitle className="text-lg">Computer Skills</CardTitle>
                    </div>
                    <CardDescription>
                      Digital literacy and programming skills for the modern world
                    </CardDescription>
                    <div className="mt-3">
                      <Badge variant="secondary">Coding Bootcamp</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Health & Wellness */}
          <TabsContent value="wellness" className="mt-8">
            <div className="mb-8">
              <img src={nutrition} alt="Girls eating healthy meals" className="w-full h-60 md:h-84 object-cover rounded-lg shadow-card" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <UserCheck className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Social Worker Program</CardTitle>
                    <img src={socialWorker} alt="Girls in computer lab" className="w-full h-62 object-cover" />

                  <CardDescription>
                    Professional counseling and support services for students and families
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Individual counseling</li>
                    <li>• Family support</li>
                    <li>• Crisis intervention</li>
                    <li>• Community outreach</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Sanitary Towels Program</CardTitle>
                                    <img src={pad} alt="Girls in computer lab" className="w-full h-62 object-cover" />

                  <CardDescription>
                    Ensuring dignity and continued education for all female students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Free sanitary products</li>
                    <li>• Health education</li>
                    <li>• Privacy and dignity</li>
                    <li>• Reduced absenteeism</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <Apple className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Nutrition Program</CardTitle>
                                                      <img src={nutrition} alt="Girls in computer lab" className="w-full h-62 object-cover" />

                  <CardDescription>
                    Balanced meals and nutrition education for healthy growth and learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Daily balanced meals</li>
                    <li>• Nutrition education</li>
                    <li>• School garden project</li>
                    <li>• Special dietary needs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhatWeDo;