import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Trophy, Heart, BookOpen, CircleDot } from "lucide-react";
import heroImage from "@/assets/hero-school.jpg";
import girlsSoccer from "@/assets/girls-soccer.jpg";
import gradImg from "@/assets/grad.jpg";
import dramaClubImg from "@/assets/drama-club.jpg";

const Home = () => {
  return (
    <div className="min-h-screen text-black">
      {/* Hero Section */}
  <section className="relative h-screen flex items-center justify-center bg-hero-gradient text-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Kibera Girls Soccer Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
We Educate, Inspire and Empower girls </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/about">Learn About Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* History Section */}
  <section className="py-16 bg-section-gradient text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our History</h2>
            <p className="mb-6 text-black text-2xl font-semibold leading-relaxed text-justify max-w-3xl mx-auto">
             Abdul Kassim, the visioanary behind KGSA, began his journey in 2002, by forming a girls' soccer team to engage teenage girls in productive activities and keep them off the streets. He soon lost so many girls since soccer alone could not address the deeiper issues of street life. Recognizing he power of education especially in the streets, Abdul set out to establish a school. Strategic networking, securing the right connections and the love he had for these girls, he raised enough funds to build a one room school in 2006 and offered free high school to thirteen girls who joined form one.  The school had only 2 volunteer teachers who taught all subjects.
The school gained more visibility and in 2007, one more class was constructed.
Through financial and technical resources, KGSA foundation enables the school to support 150 girls, employed 9 teachers and offers a variety of extra curricular activities, making lasting difference in the community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-black">Building Excellence Since Day One</h3>
              <p className="mb-6 text-black">
                Our school was established with the fundamental belief that every young woman 
                deserves access to quality education, regardless of her background. Located in the heart 
                of Kibera, we have grown from a small institution to a comprehensive educational facility 
                that serves female students from Form 1 to Form 4.
              </p>
              <p className="text-black">
                We pride ourselves on creating an environment where academic achievement, 
                character development, and personal growth go hand in hand. Our legacy 
                is built on the success of our graduates who have gone on to become doctors, 
                engineers, teachers, and community leaders.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
            
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">400+</h4>
                  <p className="text-sm text-muted-foreground">Alumnus</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">10+</h4>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">100+</h4>
                  <p className="text-sm text-muted-foreground">Awards Won</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
  <section className="py-16 bg-background text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-muted-foreground text-lg">
              We provide comprehensive education and development opportunities for our students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Games & Sports</CardTitle>
                <CardDescription>
                  Soccer, tennis, rugby, netball, and indoor games to develop physical fitness, teamwork, and leadership skills
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <img src={girlsSoccer} alt="Girls playing soccer" className="w-full h-68 object-cover rounded-b-lg" />
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Higher Education</CardTitle>
                <CardDescription>
                  College and university preparation with success stories from our female alumni
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <img src={gradImg} alt="Students in classroom" className="w-full h-98 object-cover rounded-b-lg" />
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Student Development</CardTitle>
                <CardDescription>
                  Journalism, business club, drama, music, beauty, cosmetology, sewing, and computer skills development
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <img src={dramaClubImg} alt="Students in drama club" className="w-full h-96 object-cover rounded-b-lg" />
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/what-we-do">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
  <section className="py-16 bg-hero-gradient text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-xl mb-8 opacity-90">
            Kibera Girls Soccer is a free public girls' boarding school whose mandate is to offer the approved National Curriculum in a conducive environment for learning, use of skills,holistic learning and teaching to enable the students to be creative, responsible and ready to serve humanity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;