import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Clock, 
  BookOpen,
  Utensils,
  Building,
  Mail,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState,useRef  } from "react";
import emailjs from '@emailjs/browser';


const GetInvolved = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");




  const form = useRef(null);

    const sendEmail = (e) => {
        e.preventDefault();

        // Validate the form
        if (form.current?.checkValidity()) {
            // Send email using Email.js
            emailjs.sendForm("service_arepz2d", "template_b5gupbs", form.current, "YEpVaZy41zOllTzg_Kypd")
                .then((result) => {
                    console.log(result.text);

                    // Reset the form after successful submission
                    form.current?.reset();

                    // Display success alert using SweetAlert
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'message sent successfully!',
                    // });
                }, (error) => {
                    console.log(error.text);

                    // Display error alert using SweetAlert
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: 'Error sending message. Please try again later.',
                    // });
                });
        } else {
            // If the form is not valid, display an alert or error message using SweetAlert
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please fill in all required fields.',
            // });
        }
    }


  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Get Involved</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Join us in making a difference in students' lives. There are many ways you can contribute to our mission
          </p>
        </div>

        {/* Ways to Help */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How You Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Financial Support</CardTitle>
                <CardDescription>
                  Help us provide scholarships, upgrade facilities, and support student programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Student scholarships</li>
                  <li>• Infrastructure development</li>
                  <li>• Learning materials</li>
                  <li>• Technology upgrades</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/donate">Donate Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Volunteer Your Time</CardTitle>
                <CardDescription>
                  Share your skills and expertise to enrich our students' learning experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Guest speaking</li>
                  <li>• Mentorship programs</li>
                  <li>• Skills workshops</li>
                  <li>• Career guidance</li>
                </ul>
               
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>
                  Donate books, equipment, or educational materials to support learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Textbooks & reference materials</li>
                  <li>• Computer equipment</li>
                  <li>• Laboratory supplies</li>
                  <li>• Sports equipment</li>
                </ul>
               
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Corporate Partnership</CardTitle>
                <CardDescription>
                  Partner with us for employee volunteering, internships, and CSR initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Student internship programs</li>
                  <li>• Employee volunteer days</li>
                  <li>• Skills-based workshops</li>
                  <li>• Equipment sponsorship</li>
                </ul>
                
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Utensils className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Nutrition Support</CardTitle>
                <CardDescription>
                  Help provide nutritious meals and support our nutrition programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• School feeding program</li>
                  <li>• Kitchen equipment</li>
                  <li>• Garden project support</li>
                  <li>• Nutrition education</li>
                </ul>
                
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Infrastructure Development</CardTitle>
                <CardDescription>
                  Support construction and renovation projects to improve learning facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Classroom construction</li>
                  <li>• Laboratory upgrades</li>
                  <li>• Sports facilities</li>
                  <li>• Library expansion</li>
                </ul>
               
              </CardContent>
            </Card>
          </div>
        </section>

      
        {/* Contact Form */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Ready to make a difference? Contact us to discuss how you can get involved 
                or to learn more about our programs and needs.
              </p>
              
             
            </div>

            <Card className="shadow-card">
              <CardHeader className="pb-0">
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Tell us how you'd like to help or ask any questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user_name" className="block mb-1 font-medium">Name</Label>
                      <Input id="user_name" name="user_name" placeholder="Your Name" required className="w-full" />
                    </div>
                    <div>
                      <Label htmlFor="user_email" className="block mb-1 font-medium">Email</Label>
                      <Input id="user_email" name="user_email" type="email" placeholder="you@example.com" required className="w-full" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="block mb-1 font-medium">Subject</Label>
                    <Input id="subject" name="subject" placeholder="Subject" required className="w-full" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="block mb-1 font-medium">Message</Label>
                    <Textarea id="message" name="message" placeholder="Type your message..." rows={4} required className="w-full" />
                  </div>
                  <Button className="w-full mt-2" type="submit" disabled={sending}>
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </Button>
                  {sent && <div className="text-green-600 text-sm mt-2 text-center">Message sent successfully!</div>}
                  {error && <div className="text-red-600 text-sm mt-2 text-center">{error}</div>}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetInvolved;