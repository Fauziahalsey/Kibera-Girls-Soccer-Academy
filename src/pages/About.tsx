import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Heart, Handshake, GraduationCap } from "lucide-react";
import principalImage from "@/assets/principal.jpg";
import deputyPrincipalImage from "@/assets/deputy-principal.jpg";
import mathTeacherImage from "@/assets/staff-math-teacher.jpg";
import englishTeacherImage from "@/assets/staff-english-teacher.jpg";
import scienceTeacherImage from "@/assets/staff-science-teacher.jpg";
import geographyTeacherImage from "@/assets/staff-geography-teacher.jpg";
import computerTeacherImage from "@/assets/staff-computer-teacher.jpg";
import nurseImage from "@/assets/staff-nurse.jpg";
import counselorImage from "@/assets/staff-counselor.jpg";
import administratorImage from "@/assets/staff-administrator.jpg";
import graduationImage from "@/assets/graduation.jpg";
import kgsaFoundationLogo from "@/assets/kgsa_foundation_logo.jpg";
import globalGiveBackLogo from "@/assets/logo.png";
import strathmoreImage from "@/assets/images.jpg";
import rotaryImage from "@/assets/download (1).png";
import girlsVoicesImage from "@/assets/download (2).png";
import pacificRidgeImage from "@/assets/download.jpg";
import constructionImage from "@/assets/images (4).png";
import goCampaignImage from "@/assets/unnamed.jpg";
import worldreaderImage from "@/assets/reader.jpg";
import shofcoImage from "@/assets/shofco.png";
import cfkImage from "@/assets/cfk.png";
import pademaImage from "@/assets/padem.png";
import obamaImage from "@/assets/obama.png";
import skyengImage from "@/assets/skyeng.png";
import directorImage from "@/assets/director(1).png";
import mondestahImage from "@/assets/mondestah (1).png";
import musaImage from "@/assets/musa (1).png";
import dalifaImage from "@/assets/dalifa.png";
import jamesImage from "@/assets/james.png";
import kiddyImage from "@/assets/kiddy.png";
import lilian from "@/assets/lilian.jpg";
import sammy from "@/assets/sammy .jpg";
import moha from "@/assets/moha.jpg";
import laurine from "@/assets/laurine.jpg";
import ashar from "@/assets/ashar.jpg";
import mosesImg from "@/assets/moses.png";
import josephineImg from "@/assets/josephine.jpg";
import latifahImg from "@/assets/latifah.jpg";
import jeddyImg from "@/assets/jeddy.jpg";

const About = () => {
  const students = [
    { form: "Form 1", count: 120, description: "Foundation year students" },
    { form: "Form 2", count: 43, description: "Developing core skills" },
    { form: "Form 3", count: 44, description: "Specialized learning" },
    { form: "Form 4", count: 36, description: "Graduation preparation" },
  ];

  const staff = [
    { name: "Dr. Sarah Mwangi", position: "Principal", subject: "Educational Leadership" },
    { name: "Mr. John Ochieng", position: "Deputy Principal", subject: "Mathematics" },
    { name: "Ms. Grace Wanjiku", position: "Head of Academics", subject: "English Literature" },
    { name: "Mr. Peter Kimani", position: "Sports Director", subject: "Physical Education"  }, 
    { name: "Ms. Mary Akinyi", position: "Guidance Counselor", subject: "Psychology" },
    { name: "Mr. David Muthui", position: "Science Head", subject: "Chemistry" },
    { name: "Ms. Janet Nyong'o", position: "Languages Head", subject: "Swahili" },
    { name: "Mr. James Kariuki", position: "Arts Director", subject: "Music & Drama" },
    { name: "Ms. Rose Wambui", position: "Library Head", subject: "Information Sciences" },
    { name: "Mr. Paul Otieno", position: "ICT Coordinator", subject: "Computer Science" },
    { name: "Ms. Lucy Njeri", position: "Health Coordinator", subject: "Biology" },
    { name: "Mr. Michael Kiprotich", position: "Agriculture Head", subject: "Agricultural Science" },
    { name: "Ms. Faith Wanjala", position: "Business Head", subject: "Commerce" },
    { name: "Mr. Samuel Mutiso", position: "Maintenance Head", subject: "Technical Skills" },

  ];

  const boardMembers = [
    { name: "Zawadi Kitsao ", position: "Chairperson", background: "" },
    { name: "Janet Njanja", position: "Treasurer", background: "" },
    { name: "Abdul Kassim", position: "Advisor", background: "" },
    { name: "Claris Akinyi", position: "Secretary", background: "" },
    { name: "John Wali", position: "strategic director", background: "" },
    { name: "Asha Jaffar", position: "Communications director", background: "" },

  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <section className="mb-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About Kibera Girls Soccer Academy</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We believe local problems need local solutions. We recognize the expertise
               of community leaders and invest in their ability to respond to problems on their own terms. 
               When local leaders are given the chance to lead, they create innovative solutions to 
               combat poverty that outsiders may miss. 

We believe in the power of the #girleffect. 
Investing in girls transforms their lives and uplifts their families and communities.

We stand by our Child Protection Policy. 
The protection of children is an integral component of KGSA’s approach:
 that girls receive a quality education in which their rights are respected and they
  feel safe and protected.


            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-card">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                 Transforming lives through football in education
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Breaking the cycle of poverty for the girls and their families, empowering them to 
                  become stronger, more independent and resilient women
                </p>
              </CardContent>
            </Card>
          </div>

          {/* School Motto */}
          <div className="text-center bg-hero-gradient text-primary-foreground p-8 rounded-lg mb-12">
            <h3 className="text-3xl font-bold mb-4">Our School Motto</h3>
            <p className="text-2xl italic font-semibold">"Educate. Inspire. Empower

"</p>
            <p className="mt-4 text-lg opacity-90">
              Striving for academic excellence while building character, leadership, and community impact
            </p>
          </div>
        </section>

        {/* Partner Organizations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Partner Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>KGSA FOUNDATION</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={kgsaFoundationLogo} alt="KGSA Foundation" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>SHOFCO</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={shofcoImage} alt="SHOFCO" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>CFK</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={cfkImage} alt="CFK" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Padema</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={pademaImage} alt="Padema" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Obama Foundation</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={obamaImage} alt="Obama Foundation" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Skyeng</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={skyengImage} alt="Skyeng" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
          

            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>GLOBAL GIVE BACK CIRCLE</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={globalGiveBackLogo} alt="Global Give Back Circle" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>STRATHMORE UNIVERSITY</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={strathmoreImage} alt="Strathmore University" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>ROTARY</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={rotaryImage} alt="Rotary" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>GIRLS VOICES</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={girlsVoicesImage} alt="Girls Voices" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>PACIFIC RIDGE SCHOOL</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={pacificRidgeImage} alt="Pacific Ridge School" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <CardTitle>GO CAMPAIGN</CardTitle>
              </CardHeader>
              <CardContent>
            <img src={goCampaignImage} alt="Go Campaign" className="w-full h-58 object-cover rounded-lg shadow-card" />
              </CardContent>
            </Card>
        

          </div>
        </section>

        {/* Students by Form */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Students</h2>
          <div className="mb-8">
            <img src={graduationImage} alt="Graduation ceremony" className="w-full h-66 object-cover rounded-lg shadow-card" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.filter(student => student.form !== "Form 1").map((student, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{student.form}</CardTitle>
                  <CardDescription>{student.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{student.count}</div>
                  <p className="text-sm text-muted-foreground">Students</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Featured staff with photos */}
            <Card key="claris-akinyi" className="shadow-card">
              <CardContent className="p-0">
                <img src={directorImage} alt="Claris Akinyi" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Claris Akinyi</CardTitle>
                  <Badge variant="secondary" className="mb-2">Director</Badge>
                  <p className="text-sm">Madame Claris was born and raised in a middle environment 
                    within Kibera. She played soccer with KGSA before it evolved into 
                    a free high school for girls. She attended secondary school up-country and 
                    returned to KGSA in 2007 to teach math and geography. During her 15 plus years 
                    working at KGSA, Claris obtained a Bachelor’s Degree of Education and Counseling 
                    from Kenya Methodist University and was promoted to Head Teacher, Principal and Director.
                     Claris is a beloved teacher and colleague and loves playing soccer. 
                     She’s an excellent goalkeeper and still dives after the ball during matches 
                     with staff and students. Madame Claris is a role model to the girls and inspires 
                     the students to follow their dreams. Her favorite part of the job is when alumni 
                    come back to the school to report their successes.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card key="mondester-isalamba" className="shadow-card">
              <CardContent className="p-0">
                <img src={mondestahImage} alt="Mondester Isalamba" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Mondester Isalamba</CardTitle>
                  <Badge variant="secondary" className="mb-2">Principal</Badge>
                  <p className="text-sm">Mondestah grew up in Kitale in the Rift Valley 
                    region of Kenya and studied at Jaramogi Oginga Odinga University of Science 
                    and Technology. Having been born and raised in a humble background, 
                    KGSA provides her with a platform to teach as well as an opportunity to 
                    share her life experiences with the girls. Mondestah wants to enable them 
                    to develop a positive attitude towards life in order to overcome the challenges
                     they face, especially in growing up in an informal urban settlement. 
                     Madame Mondestah has been teaching history,
                     government and religious studies at KGSA since 2016.</p>

                </div>
              </CardContent>
            </Card>

            <Card key="musa-seif" className="shadow-card">
              <CardContent className="p-0">
                <img src={musaImage} alt="Musa Seif" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Musa Seif</CardTitle>
                  <Badge variant="secondary" className="mb-2">Deputy principal</Badge>
                  <p className="text-sm">Swahili teacher</p>
                  <p className="text-sm">Musa has worked at KGSA since 2007 and teaches 
                    Kiswahili and History as well. He was born and raised in Kibera, studied
                     at the University of Eastern Africa Baraton, and received a Diploma in 
                     Education Kiswahili and History.He loves working at KGSA, 
                    because he wants to give back to his community through education.</p>

                </div>
              </CardContent>
            </Card>

            <Card key="dalifa-hassan" className="shadow-card">
              <CardContent className="p-0">
                <img src={dalifaImage} alt="Dalifa Hassan" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Dalifa Hassan</CardTitle>
                  <Badge variant="secondary" className="mb-2">Mathematics & Chemistry teacher</Badge>

                  <p className="text-sm">Dalifa grew up in the western 
                    part of Kenya in a town called Busia and graduated from KGSA in 2012. 
                    She received a Bachelor’s Degree in Education Science from Maseno University
                     and teaches mathematics and Chemistry at KGSA. She loves mentoring and 
                     empowering the girls through education. KGSA provides a great platform 
                     for that.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card key="james-miraye" className="shadow-card">
              <CardContent className="p-0">
                <img src={jamesImage} alt="James Miraye" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">James Miraye</CardTitle>
                  <Badge variant="secondary" className="mb-2">Business & Geography teacher </Badge>

                  <p className="text-sm">James teaches Business Studies and Geography. 
                    He grew up in Yala in Siaya county in Nyanza province and studied at the 
                    University of Nairobi. James likes working at KGSA because the administrators 
                    treat all staff equally and with dignity. The students are disciplined and are motivated. 
                    Finally, 
                    the school gives the students more support than just academics</p>
                </div>
              </CardContent>
            </Card>

            <Card key="khadija-abdullahi" className="shadow-card">
              <CardContent className="p-0">
                <img src={kiddyImage} alt="Khadija Abdullahi" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Khadija Abdullahi</CardTitle>
                  <Badge variant="secondary" className="mb-2">Social media manager</Badge>
                   <p className="text-sm">Khadija grew up in Kibera and is a proud
                     graduate of KGSA’s 2015 Class. In 2017, she obtained a diploma in 
                     graphics design and entrepreneurship from AkiraChix. Khadija manages 
                     the school’s social media and creates content for the Foundation’s 
                     communications. She loves researching what’s new in the tech
                     field and designing in Photoshop.  ​</p>

                </div>
              </CardContent>
            </Card>

      
            
            <Card key="lilian-wango" className="shadow-card">
              <CardContent className="p-0">
                <img src={lilian} alt="Mr. John Ochieng" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Lilian Wango</CardTitle>
                  <Badge variant="secondary" className="mb-2">English Literature teacher</Badge>
                  <p className="text-sm">Lilian was born and raised in South Nyanza. 
                    She received a Bachelor’s Degree in Education Arts at the University 
                    of Nairobi in 2017. She likes working at KGSA, because it gives her
                     a platform to practice her profession and is passionate about helping girls. 
                     Madame Lilian also oversees the Journalism Club and was the Class of 2022 advisor. 
                     These girls loved her 
                    dearly and still call her Mama Lilian even after graduatin</p>

                </div>
              </CardContent>
            </Card>

                <Card key="sammy-nyameyo" className="shadow-card">
              <CardContent className="p-0">
                <img src={sammy} alt="Dr. Sarah Mwangi" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Sammy Nyameyo</CardTitle>
                  <Badge variant="secondary" className="mb-2">Maths and physics teacher</Badge>
                  <p className="text-sm">Nyameya grew up in Nyakach in Kisumu county in
                     the Nyanza province of Kenya. He studied at the University of Nairobi. 
                     The reason he enjoys working at KGSA is that it is not just an institution
                      of learning, but a family. Since joining the school, 
                      he has developed professionally and also received immense support financially, 
                      morally, and emotionally. Although the students are from humble backgrounds, 
                      their determination
                     to succeed makes him want to give his best always.</p>
                </div>
              </CardContent>
            </Card>

                <Card key="mohemmed-ibrahim" className="shadow-card">
              <CardContent className="p-0">
                <img src={moha} alt="" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Mohemmed Ibrahim</CardTitle>
                  <Badge variant="secondary" className="mb-2">Soccer Coach</Badge>
                  <p className="text-sm">Mohammed has been coaching the school soccer 
                    team since the early days. 
                    He led the 2023 team to a third place ranking in Nairobi County</p>

                </div>
              </CardContent>
            </Card>

               <Card key="laurine-okeno" className="shadow-card">
              <CardContent className="p-0">
                <img src={laurine} alt="" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Laurine Okeno</CardTitle>
                  <Badge variant="secondary" className="mb-2">School nurse</Badge>
                  <p className="text-sm">Laurine grew up in Suba homa bay County. 
                    She graduated from KGSA in 2015 and attained a diploma in community 
                    health nurse from the Kenya Medical Training College in 2023. 
                    She currently works as the school nurse by identifying health problems, 
                    manage illnesses and refer students outside for further medication if need be. 
                    Her happy moments are when students 
                    recover and are back to class in good health</p>

                </div>
              </CardContent>
            </Card>

            <Card key="moses-ngobina" className="shadow-card">
              <CardContent className="p-0">
                <img src={mosesImg} alt="Moses Ngobina" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Moses Ngobina</CardTitle>
                  <Badge variant="secondary" className="mb-2">Biology and Chemistry teacher</Badge>
                  <p className="text-sm">Ngobina graduated from South Eastern 
                    Kenya University after growing up in Ingotse village in Kakamega 
                    county in the western part of Kenya. He feels happy and proud
                     to work at KGSA due to the support given to the young girls who
                      come from humble backgrounds. Here, they are able to realize their 
                      dreams and future goals. The life skills and academic 
                    support makes the learners so happy and joyful.</p>

                </div>
              </CardContent>
            </Card>
            
            
            <Card key="deputy" className="shadow-card">
              <CardContent className="p-0">
                <img src={josephineImg} alt="Josphine Mbinya" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Josphine Mbinya</CardTitle>
                  <Badge variant="secondary" className="mb-2">Maths and Business teacher</Badge>
                  <p className="text-sm">Josephine grew up in Mumani village in Makueni
                     County and was raised by her single father. After finishing her primary school,
                      she joined KGSA, where with a lot of determination and hard-work, 
                      she managed to perform well. After graduating from KGSA in 2018, 
                      Josephine pursued a Bachelor of Arts Degree in Education and Mathematics and Business
                       from the University of Nairobi. While in University, she completed her 
                       student internship at KGSA and was privileged to serve in leadership 
                       positions in the Christian Union. KGSA was delighted to hire Josephine 
                       as its newest teacher in 2023 when she graduated from college. Josephine states,
                        “Excellence be my heartbeat in whatever I give myself to do. It’s an honor 
                        to be impacting and 
                    inspiring future generations of KGSA girls.”</p>

                </div>
              </CardContent>
            </Card>

            <Card key="latifah-khamis" className="shadow-card">
              <CardContent className="p-0">
                <img src={latifahImg} alt="Latifah Khamis" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Latifah Khamis</CardTitle>
                  <Badge variant="secondary" className="mb-2">Matron</Badge>
                  <p className="text-sm">For over ten years, Latifah has worked with various 
                    organizations dedicating her life to the plight of the marginalized, 
                    vulnerable & disenfranchised communities. Latifah was born in Kibera and holds 
                    a Bachelor of Arts Honors Degree in Humanities and a post graduate diploma i
                    n advanced project management from the University of Johannesburg. Latifah is a recipient of the International Christian Organization MediaAward for her 
                    positive involvement in assisting with the refugee crisis in SouthSudan.</p>

                </div>
              </CardContent>
            </Card>


               <Card key="asha-kirong" className="shadow-card">
              <CardContent className="p-0">
                <img src={ashar} alt="Asha Kirong" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Asha Kirong</CardTitle>
                  <Badge variant="secondary" className="mb-2">Kiswahili and History teacher</Badge>

                  <p className="text-sm">Ashar was born and raised in Mount Elgon and attended Moi
                     Girls High School-Vokoli. In 2023, she graduated with a 
                     Bachelor of Education Arts in History and Kiswahili from the University 
                     of Nairobi. Ashar began teaching history and Kiswahili at KGSA in 2024. 
                     “I am passionate about teaching, because it gives me an opportunity to push 
                     learners above their limits and meet their human potentiality. A teacher
                      affects eternity; 
                    she can never tell where their influence stops.”</p>
                </div>
              </CardContent>
            </Card>

                 <Card key="jedidah-nderitu" className="shadow-card">
              <CardContent className="p-0">
                <img src={jeddyImg} alt="Jedidah Nderitu" className="w-full h-66 object-cover" />
                <div className="p-4">
                  <CardTitle className="text-lg">Jedidah Nderitu</CardTitle>
                  <Badge variant="secondary" className="mb-2">School social worker</Badge>
                  <p className="text-sm">Jedidah’s childhood was in Nyeri county and studied Counselling Psychology at the University of Nairobi.
                    She always had a passion to create change in her community. 
                    At KGSA She has the opportunity to practice social work by assisting the young girls grow 
                    through a key phase of their lives and create awareness of their mental health. 
                    She  loves working at KGSA because it’s the most caring environment that she has been part of throughout her career with a team that is intelligent, fun, and responsible.
                    She feels respected and valued for what she brings on board and knows that she is making a difference in young lives.</p>

                </div>
              </CardContent>
            </Card>

           
            {/* {staff.slice(3).map((member, index) => (
              <Card key={index + 3} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>
=======
            {staff.map((member, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-0">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
>>>>>>> d309a83632ab388d1f1af535993197bd8fbe5612
                    <Badge variant="secondary" className="mb-2">{member.position}</Badge>
                    <p className="text-sm">{member.subject}</p>
                  </div>
                </CardContent>
              </Card>
            ))} */}
          </div>
        </section>

        {/* Board Members */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Board of Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mb-2">{member.position}</Badge>
                    <p className="text-sm">{member.background}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;