import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Trophy, Heart, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-school.jpg";
import girlsSoccer from "@/assets/girls-soccer.jpg";
import gradImg from "@/assets/grad.jpg";
import dramaClubImg from "@/assets/drama-club.jpg";
import { useEffect } from "react";

const Home = () => {
  // Add SEO metadata
  useEffect(() => {
    document.title = "Home | Kibera Girls Soccer Academy";
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'KGSA empowers girls in Kibera through education, soccer and mentorship. Join us in transforming lives through quality education and sports.';
    document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-hero-gradient text-black">
        <img 
          src={heroImage}
          alt="Kibera Girls Soccer Academy Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
        />
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Kibera Girls Soccer Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            We Educate, Inspire and Empower girls
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/about">Learn About Us</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20" 
              asChild
            >
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
            <div className="mb-6 text-white text-lg font-normal leading-relaxed text-justify max-w-3xl mx-auto">
              <p className="mb-4">
                KGSA began as a simple idea: use sport to keep girls safe and give them hope. In 2002, 
                a community coach started a girls' soccer team to provide structure and opportunity for 
                young people in Kibera. He soon realised that sport alone wasn't enough — education 
                offered a lasting solution.
              </p>
              <p className="mb-4">
                With community support the project grew into a one-room school in 2006, opening its 
                doors to thirteen free high-school students. From those humble beginnings, KGSA has 
                expanded steadily: building classrooms, growing its teaching team, and broadening 
                programs that combine academics, life skills, and sport.
              </p>
              <p>
                Today KGSA proudly supports hundreds of students, empowers alumni to pursue higher 
                education and careers, and continues to transform lives across the community.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-black">Building Excellence Since Day One</h3>
              <div className="space-y-4 text-white">
                <p>
                  Our school was established with the fundamental belief that every young woman 
                  deserves access to quality education, regardless of her background.
                </p>
                <p>
                  We pride ourselves on creating an environment where academic achievement, 
                  character development, and personal growth go hand in hand.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, stat: "400+", label: "Alumni" },
                { icon: BookOpen, stat: "10+", label: "Years of Excellence" },
                { icon: Trophy, stat: "100+", label: "Awards Won" }
              ].map((item, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
                    <h4 className="font-semibold">{item.stat}</h4>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
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
            {[
              {
                icon: Trophy,
                title: "Games & Sports",
                description: "Soccer, tennis, rugby, netball, and indoor games to develop physical fitness, teamwork, and leadership skills",
                image: girlsSoccer,
                alt: "Girls playing soccer"
              },
              {
                icon: GraduationCap,
                title: "Higher Education",
                description: "College and university preparation with success stories from our female alumni",
                image: gradImg,
                alt: "Graduation ceremony"
              },
              {
                icon: Users,
                title: "Student Development",
                description: "Journalism, business club, drama, music, beauty, cosmetology, sewing, and computer skills development",
                image: dramaClubImg,
                alt: "Students in drama club"
              }
            ].map((item, index) => (
              <Card key={index} className="shadow-card hover:shadow-hero transition-shadow">
                <CardHeader>
                  <item.icon className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className="w-full h-64 object-cover rounded-b-lg"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                </CardContent>
              </Card>
            ))}
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
          <Heart className="h-16 w-16 mx-auto mb-6 text-accent" aria-hidden="true" />
          <h2 className="text-4xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Help us continue our mission of empowering girls through quality education, 
            sports training, and leadership development in Kibera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20" 
              asChild
            >
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;