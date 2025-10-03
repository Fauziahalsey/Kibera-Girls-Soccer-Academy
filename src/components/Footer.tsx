import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import schoolLogo from "@/assets/school-logo.png";


const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#192C6D' }} className="text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={schoolLogo} alt="Kibera Girls Soccer Academy Logo" className="h-10 w-10" />
              <span className="text-xl font-bold">Kibera Girls Soccer Academy</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Empowering young women with quality education and building future female leaders 
              through excellence in academics, sports, and character development in Kibera community.
            </p> 
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/kiberagirls_soccer?igsh=MWJ2ejIxd2N3ZGdrOQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 text-black hover:text-pink-500 transition-colors" />
              </a>
              <a href="http://www.linkedin.com/in/kibera-girls-soccer-209a47376" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6 text-black hover:text-blue-700 transition-colors" />
              </a>
              <a href="https://www.youtube.com/@KiberaGirlsSoccerAcademy" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="h-6 w-6 text-black hover:text-red-600 transition-colors" />
              </a>
              <a href="https://www.facebook.com/share/19tyQLdw6k/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="h-6 w-6 text-black hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/what-we-do" className="text-primary-foreground/80 hover:text-accent transition-colors">What We Do</Link></li>
              <li><Link to="/achievements" className="text-primary-foreground/80 hover:text-accent transition-colors">Achievements</Link></li>
              <li><Link to="/get-involved" className="text-primary-foreground/80 hover:text-accent transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/80">kiberagirlssoccer.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/80">+254 716076799</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-primary-foreground/80">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025
             KGSA. All rights reserved. Built with care for education.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;