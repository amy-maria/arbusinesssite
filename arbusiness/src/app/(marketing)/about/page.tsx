import Card from "app/ui/card";
import Form from "app/ui/form";
import {FaReact,FaJs,FaPhp, FaWordpress,FaPython,FaHtml5,FaCss3,FaGoogle, } from "react-icons/fa"



const employees = [
    {name: 'Amy', title:'CEO', buttonText: 'Message'},
    {name: 'Fi', title:'COO', buttonText: 'Message'}
];
const skills = [
  {language:'React', icon: FaReact},
  {language: 'Python', icon: FaPython},
  {language: 'PHP', icon: FaPhp},
  {language: 'Wordpress', icon: FaWordpress},
  {language: 'Javascript', icon: FaJs},
  {language: 'HTML', icon: FaHtml5},
  {language: 'CSS', icon: FaCss3},
  {language: 'SEO', icon: FaGoogle}
];
export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
      {/* About Section */}
      <section className="mx-auto max-w-2xl lg:mx-0 space-y-6">
        <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          About Us
        </h2>
        <p className="text-gray-300 text-lg sm:text-xl">
          We help businesses build beautiful, functional, and accessible web
          applications. Our team specializes in modern technologies and ensures
          high-quality solutions tailored to your needs.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
          {skills.map((s) => (
            <Card key={s.language} language={s.language} Icon={s.icon} />
          ))}
        </div>
      </section>

      {/* Employees Section */}
      <section className="mx-auto max-w-2xl lg:mx-0 space-y-6">
        <h3 className="text-4xl font-semibold text-white sm:text-5xl">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {employees.map((e) => (
            <Card
              key={e.name}
              name={e.name}
              title={e.title}
              buttonText={e.buttonText}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-2xl lg:mx-0 space-y-6">
        <h3 className="text-4xl font-semibold text-white sm:text-5xl">
          Contact Us
        </h3>
        <p className="text-gray-300 text-lg sm:text-xl">
          Have questions or want to start a project? Reach out using the form
          below and we’ll get back to you promptly.
        </p>
        <Form />
      </section>
    </div>
  );
}