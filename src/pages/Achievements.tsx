import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { 
  Video, 
  Camera, 
  BookOpen, 
  CircleDot, 
  Wifi, 
  Computer, 
  FlaskConical,
  GraduationCap,
  Play,
  Image as ImageIcon,
  Building,
  Trophy
} from "lucide-react";

import director from "@/assets/director(1).png";
import computerLab from "@/assets/computer-lab.jpg";
import dramaClub from "@/assets/drama-club.jpg";
import girlsNetball from "@/assets/netball.jpg";
import graduation from "@/assets/graduation.jpg";
import library from "@/assets/library.jpeg";
import nutrition from "@/assets/nutrition.jpg";
import sewingClass from "@/assets/sewing-class.jpg";
import libraryUpgraded from "@/assets/library.jpeg";
import turf from "@/assets/turf.jpeg";
import borehole from "@/assets/borehole.jpg";
import computerUpgraded from "@/assets/computer.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import classroom from "@/assets/classroom.jpg";

const Achievements = () => {
  const videos = [
    { title: "Annual Sports Day 2024", description: "Highlights from our biggest sporting event", duration: "5:23", link: "https://www.youtube.com/watch?v=U1ckR_B7rWY" },
    { title: "Science Fair Innovation", description: "Students presenting their projects", duration: "3:45", link: "https://www.youtube.com/watch?v=Fuj-BeW3pIc&t=3s" },
    { title: "Drama Performance", description: "Our award-winning school play", duration: "8:12", link: "https://www.youtube.com/watch?v=CA3r84yBDiQ&list=RDCA3r84yBDiQ&start_radio=1" },
    { title: "Graduation Ceremony 2024", description: "Celebrating our Form 4 graduates", duration: "12:30", link: "https://www.youtube.com/watch?v=RzHg_ywNRTI" },
  ];

  const photos = [
  { title: "Director", category: "Staff", src: director, link: director },
    { title: "Computer Lab", category: "Infrastructure", src: computerLab, link: computerLab },
    { title: "Drama Club", category: "Arts", src: dramaClub, link: dramaClub },
    { title: "Girls Netball", category: "Sports", src: girlsNetball, link: girlsNetball },
    { title: "Graduation Day", category: "Ceremony", src: graduation, link: graduation },
    { title: "Library", category: "Infrastructure", src: library, link: library },
    { title: "Nutrition Program", category: "Wellness", src: nutrition, link: nutrition },
    { title: "Sewing Class", category: "Skills", src: sewingClass, link: sewingClass },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Achievements</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Celebrating our milestones, improvements, and the success of our students
          </p>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Video & Photo Gallery</TabsTrigger>
            <TabsTrigger value="structures">Upgraded Structures</TabsTrigger>
          </TabsList>

          {/* Gallery */}
          <TabsContent value="gallery" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Gallery */}
              <div>
                <div className="flex items-center mb-6">
                  <Video className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">Video Gallery</h2>
                </div>
                <div className="space-y-4">
                  {videos.map((video, index) => (
                    <Card key={index} className="shadow-card hover:shadow-hero transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Video title removed as requested */}
                            {/* Video description removed as requested */}
                          </div>
                          <Badge variant="secondary">{video.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                      <div className="aspect-w-16 aspect-h-9 w-full">
                        <iframe
                          width="100%"
                          height="300vh"
                          src={video.link.replace('watch?v=', 'embed/').replace('&t=3s', '?start=3')}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg w-full h-86 object-cover"
                        ></iframe>
                      </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              <div>
                <div className="flex items-center mb-6">
                  <Camera className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">Photo Gallery</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <Card key={index} className="shadow-card hover:shadow-hero transition-shadow">
                      <CardContent className="p-4">
                        <a href={photo.link} target="_blank" rel="noopener noreferrer">
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="bg-muted rounded-lg h-68 w-full object-cover flex items-center justify-center mb-3 hover:opacity-80 transition-opacity"
                            />
                        </a>
                        <h4 className="font-semibold text-sm mb-1">{photo.title}</h4>
                        <Badge variant="outline" className="text-xs">{photo.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <a
                    href="https://drive.google.com/drive/folders/11LhKd3zw4jNIKRqDadXIo5b3xvFByQPW?usp=drive_link"
                    className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/80 transition-colors"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View All Photos
                  </a>
                </div>
               
              </div>
            </div>
          </TabsContent>

          {/* Upgraded Structures */}
          <TabsContent value="structures" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardContent className="p-0">
                   <a href={libraryUpgraded} target="_blank" rel="noopener noreferrer">
                     <img src={libraryUpgraded} alt="Upgraded library" className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                   </a>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-8 w-8 text-primary mr-2" />
                      <CardTitle className="text-lg">Upgraded Library</CardTitle>
                    </div>
                    <CardDescription>
                      Modern library facility with digital resources and quiet study areas
                    </CardDescription>
                   
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                     <a href={turf} target="_blank" rel="noopener noreferrer">
                       <img src={turf} alt="Football turf" className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                     </a>

                  <CircleDot className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Football Turf</CardTitle>
                  <CardDescription>
                    Professional artificial turf football field for year-round training
                  </CardDescription>
                </CardHeader>
                <CardContent>
                
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                 <a href={borehole} target="_blank" rel="noopener noreferrer">
                   <img src={borehole} alt="Borehole" className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                 </a>

                  <Wifi className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Borehole</CardTitle>
                  <CardDescription>
                    Reliable water supply ensuring clean water access for all students
                  </CardDescription>
                </CardHeader>
               
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-0">
                   <a href={computerUpgraded} target="_blank" rel="noopener noreferrer">
                     <img src={computerUpgraded} alt="Computer laboratory" className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                   </a>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Computer className="h-8 w-8 text-primary mr-2" />
                      <CardTitle className="text-lg">Computer Room</CardTitle>
                    </div>
                    <CardDescription>
                      State-of-the-art computer laboratory for digital learning
                    </CardDescription>
                   
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-0">
                   <a href={scienceLab} target="_blank" rel="noopener noreferrer">
                     <img src={scienceLab} alt="Science laboratory" className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                   </a>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <FlaskConical className="h-8 w-8 text-primary mr-2" />
                      <CardTitle className="text-lg">Science Laboratory</CardTitle>
                    </div>
                    <CardDescription>
                      Fully equipped laboratory for chemistry, biology, and physics
                    </CardDescription>
                    
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                   <a href={classroom} target="_blank" rel="noopener noreferrer">
                     <img src={classroom} alt="Modern classrooms" className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                   </a>

                  <GraduationCap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Modern Classrooms</CardTitle>
                  <CardDescription>
                    Renovated classrooms with modern teaching aids and furniture
                  </CardDescription>
                </CardHeader>
               
              </Card>
            </div>

            {/* Statistics */}
        
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Achievements;