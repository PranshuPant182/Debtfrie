import{r as i,j as e,L as y,g as u,a as r,i as o,F as b}from"./index-CyGyjiIH.js";const s={clients:2e3,success:98,experts:50,years:5};function N(){const[t,h]=i.useState(!1),[n,m]=i.useState({clients:0,success:0,experts:0,years:0}),c=i.useRef(null),x=i.useCallback(()=>{const g=33.333333333333336,l={clients:s.clients/60,success:s.success/60,experts:s.experts/60,years:s.years/60};let a=0;const p=setInterval(()=>{a++,m({clients:Math.min(Math.floor(l.clients*a),s.clients),success:Math.min(Math.floor(l.success*a),s.success),experts:Math.min(Math.floor(l.experts*a),s.experts),years:Math.min(Math.floor(l.years*a),s.years)}),a>=60&&(m(s),clearInterval(p))},g)},[]);return i.useEffect(()=>{const d=new IntersectionObserver(([f])=>{f.isIntersecting&&!t&&(h(!0),x())},{threshold:.5});return c.current&&d.observe(c.current),()=>d.disconnect()},[t,x]),e.jsxs(e.Fragment,{children:[e.jsx("style",{jsx:!0,children:`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    0% {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes countPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                        color: #3369e3;
                    }
                }

                @keyframes glowEffect {
                    0%, 100% {
                        text-shadow: 0 0 5px rgba(51, 105, 227, 0.3);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(51, 105, 227, 0.6);
                    }
                }

                .animate-fade-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .animate-slide-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .animate-slide-right {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-count-pulse {
                    animation: countPulse 0.6s ease-in-out;
                }

                .animate-glow {
                    animation: glowEffect 2s ease-in-out infinite;
                }

                .animate-delay-1 {
                    animation-delay: 0.2s;
                }

                .animate-delay-2 {
                    animation-delay: 0.4s;
                }

                .animate-delay-3 {
                    animation-delay: 0.6s;
                }

                .animate-delay-4 {
                    animation-delay: 0.8s;
                }

                .opacity-0 {
                    opacity: 0;
                }

                .counter-number {
                    transition: all 0.3s ease;
                }

                .stats-card {
                    transition: all 0.3s ease;
                }

                .stats-card:hover {
                    transform: translateY(-5px);
                }

                .stats-card:hover .counter-number {
                    color: #3369e3;
                    transform: scale(1.1);
                }
            `}),e.jsxs(y,{children:[e.jsx("title",{children:"About Debtfrie | Debt Relief Experts India"}),e.jsx("meta",{name:"description",content:"Debtfrie is a Noida-based fintech led by Bar Council-registered advocates, helping Indians settle debt and rebuild their finances."}),e.jsx("link",{rel:"canonical",href:u("/about-us")}),e.jsx("meta",{property:"og:title",content:"About Debtfrie | Debt Relief Experts India"}),e.jsx("meta",{property:"og:description",content:"Debtfrie is a Noida-based fintech led by Bar Council-registered advocates, helping Indians settle debt and rebuild their finances."}),e.jsx("meta",{property:"og:url",content:u("/about-us")}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsxs("div",{children:[e.jsxs("section",{className:"w-full px-6 md:px-12 py-12 bg-white",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-8",children:[e.jsx("div",{className:"md:w-1/2",children:e.jsxs("h1",{className:"text-[26px] sm:text-3xl sm:text-5xl font-bold leading-snug animate-slide-left",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:["About Debtfrie, ",e.jsx("br",{}),"debt relief experts ",e.jsx("span",{className:"text-blue-600",children:"you can trust"})]})}),e.jsxs("div",{className:"md:w-1/3 text-gray-600 text-base",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:[e.jsx("p",{children:"At DebtFrie, we believe financial stress shouldn't define your future. If you're struggling with overdue loans or mounting debt, our expert team of advocates and financial professionals is here to guide you with dignity and clarity."}),e.jsxs("p",{className:"mt-4",children:["We specialize in ",e.jsx(r,{to:"/debt-resolution",className:"text-blue-600 hover:underline",children:"loan settlement"}),", ",e.jsx(r,{to:"/debt-restructuring",className:"text-blue-600 hover:underline",children:"debt restructuring"}),", and advisory services—offering ethical, compliant, and empathetic solutions that ease legal and emotional strain. DebtFrie bridges the gap between borrowers and lenders, helping you restore financial stability and confidence."]})]})]}),e.jsxs("div",{className:"mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center",children:[e.jsxs("div",{className:"p-6 rounded-lg ",children:[e.jsx("div",{className:"mb-4 flex justify-start",children:e.jsx("img",{src:o.Book,alt:"Our Story Icon",className:"w-16 h-16 object-contain animate-fade-up animate-delay-1"})}),e.jsx("h3",{className:"text-xl font-semibold mb-2 text-left animate-fade-up animate-delay-1",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:"Our Story"}),e.jsxs("p",{className:"text-sm text-gray-600 text-left",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:["Founded in 2021 by Arushi Khanna and Vanshit Kaushik during the financial turmoil of COVID-19, Debtfrie was created to help individuals overwhelmed by unsecured debt. We specialize in ",e.jsx(r,{to:"/debt-resolution",className:"text-blue-600 hover:underline",children:"Loan Settlement"}),", ",e.jsx(r,{to:"/debt-restructuring",className:"text-blue-600 hover:underline",children:"Debt Restructuring"}),", and Credit Score Rebuilding, offering compassionate, personalized support tailored to each client's needs. More than a debt resolution company, Debtfrie is a financial lifeline — empowering people to overcome debt and rebuild their financial future with dignity and confidence."]})]}),e.jsxs("div",{className:"p-6 rounded-lg ",children:[e.jsx("div",{className:"mb-4 flex justify-start",children:e.jsx("img",{src:o.Target,alt:"Our Mission Icon",className:"w-16 h-16 object-contain animate-fade-up animate-delay-1"})}),e.jsx("h3",{className:"text-xl font-semibold mb-2 text-left animate-fade-up animate-delay-1",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:"Our Mission"}),e.jsxs("p",{className:"text-sm text-gray-600 text-left",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:["Our Vision: To be India's most trusted debt resolution platform, empowering individuals to overcome financial stress and regain control of their future.",e.jsx("br",{}),e.jsx("br",{}),"Our Mission: To simplify debt settlement through transparent, legal, and personalized solutions with empathetic, judgment-free support."]})]}),e.jsxs("div",{className:"p-6 rounded-lg ",children:[e.jsx("div",{className:"mb-4 flex justify-start",children:e.jsx("img",{src:o.Shield,alt:"What Sets Us Apart Icon",className:"w-16 h-16 object-contain animate-fade-up animate-delay-2"})}),e.jsx("h3",{className:"text-xl font-semibold mb-2 text-left animate-fade-up animate-delay-2",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:"What Sets Us Apart"}),e.jsx("p",{className:"text-sm text-gray-600 text-left",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:"What makes DebtFrie unique is our commitment to stress-free financial solutions—no hidden fees, no selling loans, just honest guidance to help you become truly debt-free."})]})]})]}),e.jsxs("section",{className:"w-full px-4 sm:px-8 md:px-16 py-12 bg-white",children:[e.jsxs("div",{className:"relative w-full overflow-hidden rounded-xl shadow-md",children:[e.jsx("img",{src:o.AboutUS,alt:"Family Banner",className:"w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-opacity-40 flex items-end justify-start p-6 sm:p-10",children:e.jsx("h2",{className:"text-white text-2xl sm:text-3xl md:text-6xl font-bold leading-tight animate-slide-left animate-delay-1",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:"A Debt-Free Future"})})]}),e.jsxs("div",{ref:c,className:"mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-0 text-center",children:[e.jsxs("div",{className:`stats-card flex flex-col items-center border-r border-[#3369e3] ${t?"animate-fade-up":"opacity-0"}`,children:[e.jsxs("h3",{className:`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${t?"animate-glow":""}`,style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:[n.clients,"+"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:"Clients Empowered"})]}),e.jsxs("div",{className:`stats-card flex flex-col items-center border-l border-r border-gray-300 sm:border-r-2 sm:border-[#3369e3] ${t?"animate-fade-up animate-delay-1":"opacity-0"}`,children:[e.jsxs("h3",{className:`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${t?"animate-glow":""}`,style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:[n.success,"%"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:"Successful Debt Resolutions"})]}),e.jsxs("div",{className:`stats-card flex flex-col items-center sm:border-r-2 sm:border-[#3369e3] ${t?"animate-fade-up animate-delay-2":"opacity-0"}`,children:[e.jsxs("h3",{className:`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${t?"animate-glow":""}`,style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:[n.experts,"+"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:"Financial Experts"})]}),e.jsxs("div",{className:`stats-card flex flex-col items-center border-l border-r border-gray-300 sm:border-none sm:border-l sm:border-r sm:border-gray-300 ${t?"animate-fade-up animate-delay-3":"opacity-0"}`,children:[e.jsxs("h3",{className:`counter-number text-2xl sm:text-4xl font-extrabold text-[#02102f] ${t?"animate-glow":""}`,style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:[n.years,"+"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:"Years of Expertise"})]})]})]}),e.jsx("div",{className:"w-full max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white border-t border-gray-100",children:e.jsx(b,{page:"about-us",showButton:!1})})]})]})]})}export{N as default};
