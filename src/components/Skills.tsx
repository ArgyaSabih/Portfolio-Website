const educations = [
  {
    title: "SMA Negeri 1 Semarang - High School",
    field: "Matematika & IPA",
    years: "2020 - 2023"
  },
  {
    title: "Gadjah Mada University - College",
    field: "Engineering - Information Technology",
    years: "2023 - Present"
  }
];

const skillsLeft = [
  {name: "HTML", stars: 5},
  {name: "CSS", stars: 5},
  {name: "Javascript", stars: 5},
  {name: "TailwindCSS", stars: 5},
  {name: "Github", stars: 5}
];

const skillsRight = [
  {name: "ReactJS", stars: 5},
  {name: "NextJS", stars: 5},
  {name: "NodeJS", stars: 5},
  {name: "ExpressJS", stars: 5},
  {name: "MongoDB", stars: 4}
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* Pre-title */}
        <div className="flex items-center gap-3" data-aos="fade-right">
          <span className="w-[30px] h-[1px] bg-line inline-block" />
          <h3 className="uppercase tracking-[0.5rem] text-secondary-text font-normal text-sm">
            Learning Path
          </h3>
        </div>

        {/* Section Title */}
        <h1
          className="text-[1.6rem] md:text-[2rem] mt-2 mb-10 md:mt-4 md:mb-16 font-bold text-primary-text"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          Skills & Education
        </h1>

        {/* Skills Grid */}
        <div data-aos="fade-up" data-aos-delay="300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {/* Left - Education Timeline */}
            <div className="mb-4">
              {educations.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="px-3">
                    <div className="w-[2px] h-full bg-border-custom relative">
                      <div className="absolute -left-[6px] top-0 w-[15px] h-[15px] bg-border-custom rounded-full" />
                    </div>
                  </div>
                  {/* Education Info */}
                  <div>
                    <h4 className="font-medium text-primary-text">{edu.title}</h4>
                    <p className="text-secondary-text my-2 text-sm lg:text-base">{edu.field}</p>
                    <h4 className="text-primary-text mb-12">{edu.years}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Skills */}
            <div className="mb-4">
              <p className="text-secondary-text text-sm lg:text-base leading-relaxed">
                For about three years and a half, these are summary of my skills. Field of web developer.
              </p>
              <div className="grid grid-cols-2 mt-6">
                <ul className="leading-8">
                  {skillsLeft.map((skill) => (
                    <li key={skill.name} className="text-secondary-text text-sm lg:text-base">
                      {skill.name} | {Array(skill.stars).fill("☆").join(" ")}
                    </li>
                  ))}
                </ul>
                <ul className="leading-8 pl-4">
                  {skillsRight.map((skill) => (
                    <li key={skill.name} className="text-secondary-text text-sm lg:text-base">
                      {skill.name} | {Array(skill.stars).fill("☆").join(" ")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
