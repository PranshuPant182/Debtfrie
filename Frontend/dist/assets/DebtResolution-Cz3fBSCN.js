import{r as l,i as u,j as e,u as D,D as R,L as F,g as w,F as T}from"./index-CyGyjiIH.js";import{S as A,C as I}from"./slick-theme-BehULuB6.js";import{P as E}from"./phone-X_4IpWwa.js";const k=[{id:1,title:"Personalized Debt Plan",description:"We assess your finances and design a repayment or settlement plan that fits your budget.",image:u.Financial_Assessment_and_Consultation},{id:2,title:"Expert Allocation",description:"From budgeting tools, on-call counsellors & Advocates, you get full dedicated team for your support.",image:u.Progress_Monitoring},{id:3,title:"Self-Save Model (No Loan)",description:"You set aside a part of your earnings and save them in your own account. This is your money, used only to settle your debts. Kindly note that we don't offer any loan. You repay the settlement amount from your savings.",image:u.Checklist},{id:4,title:"Expert Negotiation",description:"Our specialists negotiate with your banks and lenders to reduce your debt, waive interest, and secure the best settlement terms.",image:u.Financial_Assessment_and_Consultation},{id:5,title:"Legal & Harassment Support",description:"We protect you from Banks Harassment, guide you through legal notices and handle creditor communications on your behalf.",image:u.Progress_Monitoring},{id:6,title:"You Are Debt Free",description:"Congratulations! You are now completely debt-free and ready to embrace a more financially secure and empowered future.",image:u.Checklist}],W=()=>{const[r,n]=l.useState(0);return l.useEffect(()=>{const t=setInterval(()=>{n(s=>(s+1)%k.length)},2e3);return()=>clearInterval(t)},[]),e.jsxs("div",{className:"w-full h-screen flex flex-col md:pl-10",children:[e.jsx("div",{className:"w-full h-auto md:h-[20%] flex justify-center items-center mt-7 sm:mt-0 py-4 md:py-0",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:e.jsxs("h2",{className:"text-2xl md:text-4xl font-bold text-center px-4",children:["Just 6 Easy Steps To Start",e.jsx("br",{className:"hidden md:block"}),"Your Journey Towards",e.jsx("span",{className:"text-blue-500",children:" A Debt-"}),e.jsx("span",{className:"text-yellow-500",children:"Free Life."})]})}),e.jsx("div",{className:"md:hidden w-full flex-1 overflow-hidden mt-7 sm:mt-0",children:e.jsx("div",{className:"flex transition-transform duration-500 ease-in-out",style:{transform:`translateX(-${r*100}%)`},children:k.map((t,s)=>e.jsx("div",{className:"w-full flex justify-center items-center px-4 flex-shrink-0",children:e.jsxs("div",{className:"w-[360px] text-white rounded-2xl overflow-hidden flex flex-col px-6 py-4",style:{backgroundColor:s%2===0?"#0B1437":"#3369e3",height:"480px"},children:[e.jsx("div",{className:"bg-white text-[#0B1437] w-10 h-10 flex items-center justify-center rounded-full font-medium mb-6",style:{fontFamily:"gilroy",fontWeight:500,alignSelf:"flex-start"},children:s+1<10?`0${s+1}`:s+1}),e.jsx("div",{className:"mb-4",children:e.jsx("h3",{className:"text-2xl font-bold",style:{fontFamily:"Youth",fontWeight:900},children:t.title})}),e.jsx("div",{className:"mb-6 flex-1 flex items-start",children:e.jsx("p",{className:"text-sm text-gray-200 leading-snug",style:{fontFamily:"gilroy",fontWeight:400},children:t.description})}),e.jsx("div",{className:"flex justify-end mt-auto",children:e.jsx("img",{src:t.image,alt:`Step ${s+1}`,className:"max-h-[160px] object-contain"})})]})},t.id))})}),e.jsx("div",{className:"hidden md:block w-full flex-1 overflow-x-auto flex-col scrollbar-hide",children:e.jsx("div",{className:"flex space-x-4 px-4 py-4 w-max transition-transform duration-500 ease-in-out",style:{transform:`translateX(-${r*55}vw)`},children:k.map((t,s)=>e.jsxs("div",{className:"min-w-[55vw] max-w-[60vw] text-white rounded-3xl p-6 flex relative overflow-hidden",style:{backgroundColor:s%2===0?"#0B1437":"#3369e3",height:"68vh"},children:[e.jsx("div",{className:"absolute top-6 left-6 font-semibold text-2xl bg-white text-[#0B1437] w-12 h-12 flex items-center justify-center rounded-full z-10",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:`0${s+1}`}),e.jsxs("div",{className:"flex-1 pl-6 pr-8 pt-20 flex flex-col max-w-[60%]",children:[e.jsx("div",{className:"mb-6",children:e.jsx("h3",{className:"text-2xl lg:text-3xl font-bold leading-tight",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"110%",letterSpacing:"0%"},children:t.title})}),e.jsx("div",{className:"flex-1 flex items-start overflow-hidden",children:e.jsx("p",{className:"text-lg lg:text-xl text-gray-300 leading-relaxed break-words",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"130%",letterSpacing:"0%",wordWrap:"break-word",overflowWrap:"break-word",hyphens:"auto"},children:t.description})})]}),e.jsx("div",{className:"flex-shrink-0 h-full flex items-end justify-end pr-4 pb-4 max-w-[40%]",children:e.jsx("img",{src:t.image,alt:`Step ${s+1}`,className:"h-[80%] w-auto object-contain"})})]},t.id))})}),e.jsx("div",{className:"flex justify-center space-x-2 py-4",children:k.map((t,s)=>e.jsx("button",{onClick:()=>n(s),className:`w-3 h-3 rounded-full transition-colors duration-300 ${s===r?"bg-blue-500":"bg-gray-300"}`},s))})]})},B=()=>{const r=D(),[n,t]=l.useState(1e3),[s,o]=l.useState(2e3),[d,b]=l.useState(!1),x=n+s,f=Math.round(x*.3),p=x-f,v=x>0?f/x*100:0,N=36,h=2*Math.PI*N,g=h*(v/100);return e.jsxs("div",{className:"w-full h-auto px-4 py-10 flex flex-col items-center justify-center bg-gradient-to-r from-white to-blue-50",children:[e.jsxs("div",{className:"text-center mb-6 max-w-2xl mx-auto",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"100%",letterSpacing:"0%"},children:[e.jsxs("h2",{className:"text-3xl sm:text-5xl font-bold",children:["Your Path To A ",e.jsx("span",{className:"text-[#4575FE]",children:"Debt-Free"})]}),e.jsx("h2",{className:"text-3xl sm:text-5xl font-bold",children:"Life Starts Here"}),e.jsx("p",{className:"text-lf mt-2 text-gray-600",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:"Track, Manage, And Clear Your Debts With Ease."})]}),e.jsxs("div",{className:"w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-10",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"100%",letterSpacing:"0%"},children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold mb-1",children:"1. Your Credit Card Debt"}),e.jsxs("div",{className:"relative mt-12 flex justify-center",children:[e.jsx("input",{type:"range",min:"0",max:"10000000",step:"1000",value:n,onChange:y=>t(Number(y.target.value)),className:"w-[75%] accent-blue-500"}),e.jsxs("div",{className:"absolute right-6 sm:right-20 -top-6 font-semibold text-black",children:["₹",n]})]})]}),e.jsxs("div",{className:"mt-8",children:[e.jsx("p",{className:"font-semibold mb-1",children:"2. Your Personal Loan Debt"}),e.jsxs("p",{className:"text-xs text-gray-500 mb-1",children:["Our lender rates vary from ",e.jsx("span",{className:"font-bold",children:"5.20%"})," to ",e.jsx("span",{className:"font-bold",children:"35.99%"})," APR"]}),e.jsxs("div",{className:"relative mt-12 flex justify-center",children:[e.jsx("input",{type:"range",min:"0",max:"10000000",step:"1000",value:s,onChange:y=>o(Number(y.target.value)),className:"w-[75%] accent-blue-500"}),e.jsxs("div",{className:"absolute right-6 sm:right-20 -top-6 font-semibold text-black",children:["₹",s]})]})]}),e.jsxs("div",{className:"mt-8",children:[e.jsx("p",{className:"font-semibold mb-1",children:"3. Check the results"}),e.jsxs("p",{className:"text-sm text-gray-700 mb-4",children:["Your total debt is ",e.jsxs("span",{className:"font-bold",children:["₹",x.toLocaleString()]}),". With Debtfrie, you may settle this for just ",e.jsxs("span",{className:"font-bold",children:["₹",f.toLocaleString()]}),", saving you ",e.jsxs("span",{className:"font-bold",children:["₹",p.toLocaleString()]}),"!"]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-4 mt-10",children:[e.jsx("div",{className:"w-30 h-30 flex-shrink-0 flex items-center justify-center",children:e.jsxs("svg",{className:"w-30 h-30",viewBox:"0 0 100 100",children:[e.jsx("circle",{cx:"50",cy:"50",r:N,fill:"none",stroke:"#E5E7EB",strokeWidth:"8"}),e.jsx("circle",{cx:"50",cy:"50",r:N,fill:"none",stroke:"#3B82F6",strokeWidth:"8",strokeDasharray:`${g},${h}`,strokeLinecap:"round",transform:"rotate(-90 50 50)"}),e.jsxs("text",{x:"50",y:"52",textAnchor:"middle",className:"fill-blue-500 text-[10px] font-bold",children:["₹",p.toLocaleString()]})]})}),e.jsxs("div",{className:"flex-1 flex flex-col justify-center space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-center text-sm mb-6 space-x-6",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"sm:w-4 w-6 h-4 bg-black rounded-sm mr-2"}),e.jsx("span",{className:"text-gray-500",children:"Without Debtfrie"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"sm:w-4 w-6 h-4 bg-blue-500 rounded-sm mr-2"}),e.jsx("span",{className:"text-gray-500",children:"With Debtfrie"})]})]}),e.jsxs("div",{className:"flex items-center justify-end space-x-2",children:[e.jsxs("span",{className:"text-sm font-semibold text-black",children:["₹",x.toLocaleString()]}),e.jsx("div",{className:"w-[85%] h-2 bg-gray-200 rounded-full",children:e.jsx("div",{className:"h-full bg-black w-full rounded-full"})})]}),e.jsxs("div",{className:"flex items-center justify-end space-x-2",children:[e.jsxs("span",{className:"text-sm font-semibold text-black",children:["₹",f.toLocaleString()]}),e.jsx("div",{className:"w-[85%] h-2 bg-blue-100 rounded-full",children:e.jsx("div",{className:"h-full bg-blue-500 rounded-full",style:{width:`${v}%`}})})]})]})]}),e.jsx("div",{className:"flex justify-center items-center mt-10",children:e.jsx("button",{className:"w-[50%] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold",onClick:()=>b(!0),children:"Check Rates"})}),e.jsx("p",{className:"text-xs text-center text-gray-600 mt-4",children:"Checking rate won't affect your credit score. Calculator results are for illustrative purposes only."})]})]}),d&&e.jsx(R,{onClose:()=>b(!1),onRedirect:()=>{b(!1),r("/contact-us")}})]})},Y=()=>{const[r,n]=l.useState(!1),t=l.useRef(null);return l.useEffect(()=>{const s=new IntersectionObserver(([o])=>{o.isIntersecting&&n(!0)},{threshold:.3,rootMargin:"0px 0px -50px 0px"});return t.current&&s.observe(t.current),()=>{t.current&&s.unobserve(t.current)}},[]),e.jsxs("div",{ref:t,className:"w-full min-h-auto px-4 py-10 flex flex-col items-center justify-center",children:[e.jsx("style",{jsx:!0,children:`
                @keyframes slideInRight {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInLeft {
                    0% {
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInRight {
                    animation: slideInRight 1s ease-out forwards;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .hidden-initially {
                    opacity: 0;
                    transform: translateX(-50px);
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(100%);
                }
            `}),e.jsx("div",{className:"w-full max-w-7xl",children:e.jsxs("div",{className:"flex flex-col lg:flex-row items-center gap-8 lg:gap-12",children:[e.jsxs("div",{className:"flex-1 text-center lg:text-left",children:[e.jsxs("h2",{className:"text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"120%"},children:["What Is ",e.jsx("span",{className:"text-blue-600",children:"Debt Resolution?"})]}),e.jsx("p",{className:"text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"150%"},children:"Our Debt resolution program is a process where we negotiate with your creditors to navigate the total amount you owe. Instead of paying your full outstanding balance, we help you settle your loan for a lower, agreed-upon amount in accordance with RBI regulations and OTS schemes set by the banks. This helps you avoid bankruptcy, stop collection harassment, and get back on track financially."})]}),e.jsx("div",{className:"flex-1 flex justify-center lg:justify-end",children:e.jsx("div",{className:`w-full max-w-xs sm:max-w-sm lg:max-w-lg ${r?"animate-slideInRight":"hidden-initially-right"}`,children:e.jsx("img",{src:u.debt_Settlement,alt:"Debt Resolution Illustration",className:"w-full h-auto object-contain"})})})]})})]})},L=()=>{const[r,n]=l.useState(!1),t=l.useRef(null);return l.useEffect(()=>{const s=new IntersectionObserver(([o])=>{o.isIntersecting&&n(!0)},{threshold:.3,rootMargin:"0px 0px -50px 0px"});return t.current&&s.observe(t.current),()=>{t.current&&s.unobserve(t.current)}},[]),e.jsxs("div",{ref:t,className:"w-full min-h-auto px-4 py-10 flex flex-col items-center justify-center",children:[e.jsx("style",{jsx:!0,children:`
                @keyframes slideInLeft {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInRight {
                    0% {
                        transform: translateX(50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    0% {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards 0.3s;
                }

                .hidden-initially-left {
                    opacity: 0;
                    transform: translateX(-100%);
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(50px);
                }

                .hidden-initially-up {
                    opacity: 0;
                    transform: translateY(30px);
                }
            `}),e.jsx("div",{className:"w-full max-w-7xl",children:e.jsxs("div",{className:"flex flex-col lg:flex-row items-start gap-8 lg:gap-12",children:[e.jsx("div",{className:"hidden lg:flex flex-1 justify-center lg:justify-start",children:e.jsx("div",{className:`w-full max-w-md lg:max-w-lg ${r?"animate-slideInLeft":"hidden-initially-left"}`,children:e.jsx("img",{src:u.debt_Settlement_2,alt:"Debt Resolution Illustration",className:"h-auto object-contain"})})}),e.jsxs("div",{className:"flex-1 text-center lg:text-left",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"120%"},children:["What is ",e.jsx("span",{className:"text-blue-600",children:"Debt Settlement?"})]}),e.jsx("p",{className:"text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-8",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"150%"},children:`Debt settlement is a specific form of debt resolution. In a debt settlement, we work with your lender to reach an agreement where you pay a lump sum or structured payments that are less than what you originally owed. The lender then considers your debt "settled" or "resolved," and forgives the remaining balance. Debt settlement can stop further interest and penalty charges, collection calls, and even legal action. It's a legal and widely accepted way to resolve unsecured debts when you're unable to pay in full.`})]}),e.jsxs("div",{className:"text-left",children:[e.jsx("h3",{className:"text-lg sm:text-xl font-bold mb-4",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"120%"},children:"Key points about Debt settlement:"}),e.jsxs("ul",{className:"space-y-3 text-sm sm:text-base text-gray-700",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"150%"},children:[e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"It is not a loan; you pay off debt with your own savings."})]}),e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"The settlement amount and terms depend on Reserve Bank of India policies, OTS schemes set by the banks & NBFCs, your financial situation and the lender's policies."})]}),e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Settlement may be a one-time payment, structured over a term, or include special terms like a moratorium period."})]}),e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Our advocates ensure the settlement is documented and protects you from future claims."})]})]})]}),e.jsx("div",{className:`flex lg:hidden justify-center mt-8 ${r?"animate-fadeInUp":"hidden-initially-up"}`,children:e.jsx("div",{className:"w-full max-w-xs",children:e.jsx("img",{src:u.debt_Settlement_2_2,alt:"Debt Resolution Illustration",className:"h-auto object-contain mx-auto"})})})]})]})})]})},$=()=>{const r=[{question:"The Urgent Call: A creditor rings up, demanding you pay right now. What's your move?",options:["A) Pay instantly—anything for peace!","B) Stay cool, ask for written proof, and call in DEBTFRIE's experts.",'C) Hit "ignore" and hope they vanish.']},{question:"The Juggling Act: You're spinning plates with multiple loans and credit cards. What's your game plan?",options:["A) Grab another loan to cover the old ones.","B) Sort your debts, set priorities, and team up with DEBTFRIE for a plan.","C) Cross your fingers and hope it all works out."]},{question:"The Legal Notice: A legal letter lands in your mailbox about overdue payments. What's your next step?",options:["A) Panic and borrow from anyone who'll help.","B) Snap a pic and send it to DEBTFRIE for expert support.","C) Toss it aside and hope it's a mistake."]}],[n,t]=l.useState({}),[s,o]=l.useState(!1),[d,b]=l.useState(!1),[x,f]=l.useState(!1),p=D(),v=()=>{const[a,i]=l.useState([]);return l.useEffect(()=>{if(x){const c=[],m=["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899"];for(let S=0;S<100;S++)c.push({id:S,color:m[Math.floor(Math.random()*m.length)],left:Math.random()*100,animationDelay:Math.random()*1,animationDuration:2+Math.random()*1});i(c);const C=setTimeout(()=>{f(!1),i([])},5e3);return()=>clearTimeout(C)}},[x]),x?e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-[10000] overflow-hidden",children:[a.map(c=>e.jsx("div",{className:"absolute w-2 h-2 opacity-80",style:{left:`${c.left}%`,backgroundColor:c.color,animationDelay:`${c.animationDelay}s`,animationDuration:`${c.animationDuration}s`,animation:`confetti-fall ${c.animationDuration}s ${c.animationDelay}s ease-out forwards`,borderRadius:Math.random()>.5?"50%":"0"}},c.id)),e.jsx("style",{jsx:!0,children:`
                    @keyframes confetti-fall {
                        0% {
                            transform: translateY(-100vh) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `})]}):null},N=(a,i)=>{t({...n,[a]:i})},h=()=>{const a={A:0,B:0,C:0};Object.values(n).forEach(m=>{m===0?a.A++:m===1?a.B++:m===2&&a.C++});const i=Math.max(a.A,a.B,a.C),c=Object.keys(a).filter(m=>a[m]===i);return c.includes("B")&&a.B>=2?{title:"You're a Debt Defender! 🛡️",message:"Smart, proactive, and ready to win. With DEBTFRIE, you'll reach debt freedom even faster.",type:"success"}:c.length>1||a.A>0&&a.B>0&&a.C>0?{title:"You're on the Right Track! 📈",message:"You're trying, but there's room to sharpen your strategy. Let DEBTFRIE give you the tools and confidence to take control.",type:"warning"}:{title:"No Judgment—Debt is Tough! 💪",message:"But you don't have to face it alone. DEBTFRIE's friendly experts are just a click away to help you turn things around.",type:"info"}},g=async()=>{b(!0),await new Promise(a=>setTimeout(a,1e3)),b(!1),f(!0),setTimeout(()=>{o(!0)},200)},y=()=>{o(!1),f(!1)},j=Object.keys(n).length===r.length;return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8",children:[e.jsx(v,{}),e.jsx("div",{className:"max-w-4xl mx-auto px-4 py-4",children:e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mb-3",children:[e.jsx(A,{className:"w-3 h-3"}),"Financial Assessment"]}),e.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-gray-900 mb-2",children:"How Debt-Savvy Are You?"}),e.jsx("p",{className:"text-sm text-gray-600 max-w-xl mx-auto",children:"Take our quick assessment to discover your debt management style and get personalized recommendations"})]})}),e.jsx("div",{className:"max-w-3xl mx-auto px-4",children:e.jsx("div",{className:"bg-white rounded-xl shadow-lg overflow-hidden",children:e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-1",children:[e.jsx("span",{className:"text-xs font-medium text-gray-600",children:"Progress"}),e.jsxs("span",{className:"text-xs font-medium text-gray-600",children:[Object.keys(n).length,"/",r.length]})]}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-1.5",children:e.jsx("div",{className:"bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-300",style:{width:`${Object.keys(n).length/r.length*100}%`}})})]}),e.jsx("div",{className:"space-y-5",children:r.map((a,i)=>e.jsxs("div",{className:"border-b border-gray-100 pb-5 last:border-b-0",children:[e.jsxs("h3",{className:"text-base font-semibold text-gray-900 mb-3 leading-tight",children:[i+1,". ",a.question]}),e.jsx("div",{className:"space-y-2",children:a.options.map((c,m)=>e.jsxs("label",{className:`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 hover:shadow-sm ${n[i]===m?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-gray-300"}`,children:[e.jsx("input",{type:"radio",name:`question-${i}`,value:m,checked:n[i]===m,onChange:()=>N(i,m),className:"w-4 h-4 text-blue-600 focus:ring-blue-500"}),e.jsx("span",{className:"text-sm text-gray-700 flex-1",children:c})]},m))})]},i))}),e.jsx("div",{className:"mt-6 text-center",children:e.jsx("button",{onClick:g,disabled:!j||d,className:`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${j&&!d?"bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5":"bg-gray-300 text-gray-500 cursor-not-allowed"}`,children:d?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),"Processing..."]}):e.jsxs(e.Fragment,{children:[e.jsx(I,{className:"w-4 h-4"}),"Get My Results"]})})})]})})}),s&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-[9999] p-4",children:e.jsx("div",{className:"bg-white p-6 rounded-xl max-w-md w-full text-center shadow-xl transform animate-bounce-in",children:(()=>{const a=h();return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3",children:e.jsx(I,{className:"w-6 h-6 text-blue-600"})}),e.jsx("h2",{className:"text-lg font-bold text-gray-800 mb-2",children:"🌟 Your Results"}),e.jsx("h3",{className:"text-base font-semibold text-blue-600 mb-2",children:a.title}),e.jsx("p",{className:"text-gray-600 text-sm leading-relaxed mb-4",children:a.message})]}),e.jsxs("div",{className:"border-t border-gray-100 pt-4",children:[e.jsxs("div",{className:"bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4",children:[e.jsx("h4",{className:"text-sm font-bold text-gray-800 mb-1",children:"Take the First Step Today"}),e.jsxs("p",{className:"text-gray-700 text-xs leading-relaxed",children:["Book your ",e.jsx("strong",{className:"text-blue-600",children:"₹49 consultation"})," and start your journey to financial freedom."]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2",children:[e.jsxs("button",{onClick:()=>p("/contact-us"),className:"bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2",children:[e.jsx(E,{className:"w-3 h-3"}),"Book Consultation"]}),e.jsx("button",{onClick:y,className:"bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors text-gray-700 px-4 py-2 rounded-lg font-medium text-sm border border-gray-200",children:"Maybe Later"})]})]})]})})()})}),e.jsx("style",{jsx:!0,children:`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes bounce-in {
                    0% {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.8;
                    }
                    70% {
                        transform: scale(0.9);
                        opacity: 0.9;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out;
                }
            `})]})},H=()=>{const[r,n]=l.useState(!1),t=l.useRef(null);return l.useEffect(()=>{const s=new IntersectionObserver(([o])=>{o.isIntersecting&&n(!0)},{threshold:.3,rootMargin:"0px 0px -50px 0px"});return t.current&&s.observe(t.current),()=>{t.current&&s.unobserve(t.current)}},[]),e.jsxs("div",{ref:t,className:"w-full min-h-auto px-4 py-10 flex flex-col items-center justify-center",children:[e.jsx("style",{jsx:!0,children:`
                @keyframes slideInLeft {
                    0% {
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInRight {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    0% {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 1s ease-out forwards;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards 0.2s;
                }

                .hidden-initially-left {
                    opacity: 0;
                    transform: translateX(-50px);
                }

                .hidden-initially-right {
                    opacity: 0;
                    transform: translateX(100%);
                }

                .hidden-initially-up {
                    opacity: 0;
                    transform: translateY(30px);
                }

                .stagger-1 {
                    animation-delay: 0.1s;
                }
                .stagger-2 {
                    animation-delay: 0.2s;
                }
                .stagger-3 {
                    animation-delay: 0.3s;
                }
                .stagger-4 {
                    animation-delay: 0.4s;
                }
                .stagger-5 {
                    animation-delay: 0.5s;
                }
                .stagger-6 {
                    animation-delay: 0.6s;
                }
            `}),e.jsx("div",{className:"w-full max-w-7xl mb-5",children:e.jsxs("div",{className:"flex flex-col lg:flex-row items-start gap-8 lg:gap-12",children:[e.jsx("div",{className:"flex-1 text-center lg:text-left",children:e.jsxs("div",{className:"text-left mb-8",children:[e.jsx("div",{children:e.jsx("h3",{className:"text-lg sm:text-xl font-bold mb-4",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"120%"},children:"Types of Settlements We Can Negotiate"})}),e.jsxs("ul",{className:"space-y-2 text-sm sm:text-base text-gray-700 mb-4",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"150%"},children:[e.jsxs("li",{className:"flex items-start ",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"One-time settlement"})]}),e.jsxs("li",{className:"flex items-start ",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Settlement with credit clearance"})]}),e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Settlement over a term (installments)"})]}),e.jsxs("li",{className:"flex items-start ",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Moratorium period before payments start"})]}),e.jsxs("li",{className:"flex items-start ",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Time-barred debt solutions"})]}),e.jsxs("li",{className:"flex items-start ",children:[e.jsx("span",{className:"text-blue-600 mr-2 mt-1",children:"•"}),e.jsx("span",{children:"Foreclosure"})]})]}),e.jsx("div",{style:{animationDelay:"0.7s"},children:e.jsx("p",{className:"text-sm sm:text-base text-gray-700 font-medium",style:{fontFamily:"gilroy",fontWeight:500,lineHeight:"150%"},children:"Our advocates ensure your settlement letter matches the agreed terms and protects you from future claims."})})]})}),e.jsx("div",{className:"flex-1 flex justify-center lg:justify-end",children:e.jsx("div",{className:`w-full max-w-md lg:max-w-lg ${r?"animate-slideInRight":"hidden-initially-right"}`,children:e.jsx("img",{src:u.debt_Settlement_3_2,alt:"Debt Settlement Illustration",className:"h-auto object-contain"})})})]})})]})},P=()=>{const[r,n]=l.useState(!1),t=l.useRef(null);l.useEffect(()=>{const o=new IntersectionObserver(([d])=>{d.isIntersecting&&n(!0)},{threshold:.3,rootMargin:"0px 0px -50px 0px"});return t.current&&o.observe(t.current),()=>{t.current&&o.unobserve(t.current)}},[]);const s=[{key:"No New Loans:",text:"You pay your debt with your own savings."},{key:"Affordable plans:",text:"Get your loans settled at affordable rates with our personalized plans according to your affordability."},{key:"Collection Harassment Support:",text:"We handle tough calls and protect your rights."},{key:"Legal Guidance:",text:"Our team supports you through every legal step."},{key:"Transparent Process:",text:"Track your progress through your personal dashboard."}];return e.jsxs("div",{ref:t,className:"w-full min-h-auto px-4 py-16 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50",children:[e.jsx("style",{jsx:!0,children:`
                @keyframes slideInLeft {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out forwards;
                }

                .hidden-initially-left {
                    opacity: 0;
                    transform: translateX(-100%);
                }

                @keyframes pulse-gentle {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .animate-pulse-gentle {
                    animation: pulse-gentle 2s ease-in-out infinite;
                }

                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}),e.jsx("div",{className:"w-full max-w-7xl mb-16",children:e.jsxs("div",{className:"flex flex-col lg:flex-row items-center gap-8 lg:gap-12",children:[e.jsx("div",{className:"flex-1 flex justify-center lg:justify-start",children:e.jsx("div",{className:`w-full max-w-md lg:max-w-lg ${r?"animate-slideInLeft":"hidden-initially-left"}`,children:e.jsx("img",{src:u.Financial_Assessment_and_Consultation,alt:"Why Choose DEBTFRIE Illustration",className:"w-full h-auto object-contain"})})}),e.jsxs("div",{className:"flex-1 text-center lg:text-left",children:[e.jsxs("h3",{className:"text-2xl sm:text-3xl lg:text-4xl font-bold mb-8",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"120%"},children:["Why Choose ",e.jsx("span",{className:"text-blue-600",children:"DEBTFRIE?"})]}),e.jsx("ul",{className:"space-y-4 text-sm sm:text-base lg:text-lg text-gray-700",style:{fontFamily:"gilroy",fontWeight:400,lineHeight:"150%"},children:s.map((o,d)=>e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-600 mr-3 mt-1 text-lg",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-blue-800",children:o.key})," ",o.text]})]},d))})]})]})}),e.jsx("div",{className:`w-full max-w-lg transform transition-all duration-1000 delay-500 ${r?"translate-y-0 opacity-100 scale-100":"translate-y-20 opacity-0 scale-95"}`,children:e.jsxs("div",{className:"text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102",children:[e.jsx("h3",{className:"text-base sm:text-lg font-bold mb-2 text-blue-800",style:{fontFamily:"Youth",fontWeight:900,lineHeight:"120%"},children:"Ready for Real Freedom?"}),e.jsxs("p",{className:"text-xs sm:text-sm text-gray-700 font-medium mb-3",style:{fontFamily:"gilroy",fontWeight:500,lineHeight:"150%"},children:["Check if you qualify—apply for a consultation ",e.jsx("span",{className:"text-blue-600 font-bold",children:"@Rs.49/-"})," today. Let's resolve your debt together."]}),e.jsx("button",{className:"bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 animate-pulse-gentle",children:"Apply for Consultation"})]})})]})},O=({onGetStarted:r})=>{const[n,t]=l.useState(!1),[s,o]=l.useState(!1),[d,b]=l.useState(!1),[x,f]=l.useState(!1),p=l.useRef(null);D(),l.useEffect(()=>{const h=new IntersectionObserver(([g])=>{g.isIntersecting&&(t(!0),setTimeout(()=>o(!0),200),setTimeout(()=>b(!0),800),setTimeout(()=>f(!0),1200))},{threshold:.2});return p.current&&h.observe(p.current),()=>{p.current&&h.unobserve(p.current)}},[]);const v=({text:h,className:g,delay:y=0})=>{const j=h.split(" ");return e.jsx("span",{className:g,children:j.map((a,i)=>e.jsxs("span",{className:`inline-block transform transition-all duration-800 ease-out ${s?"translate-y-0 opacity-100":"translate-y-10 opacity-0"}`,style:{transitionDelay:`${y+i*100}ms`},children:[a,i<j.length-1&&" "]},i))})},N=({text:h,className:g})=>{const y=h.split(" ");return e.jsx("span",{className:g,children:y.map((j,a)=>e.jsxs("span",{className:`inline-block transform transition-all duration-800 ease-out ${d?"translate-y-0 opacity-100 rotate-0 scale-100":"translate-y-12 opacity-0 rotate-3 scale-95"}`,style:{transitionDelay:`${a*150}ms`},children:[j.split("").map((i,c)=>e.jsx("span",{className:`inline-block transform transition-all duration-600 ease-out ${d?"translate-y-0 opacity-100":"translate-y-8 opacity-0"}`,style:{transitionDelay:`${a*150+c*50}ms`},children:i},c)),a<y.length-1&&e.jsx("span",{className:`inline-block transform transition-all duration-600 ease-out ${d?"opacity-100":"opacity-0"}`,style:{transitionDelay:`${a*150+j.length*50}ms`},children:" "})]},a))})};return e.jsxs("div",{ref:p,className:"w-full min-h-screen bg-[#ebf1fc] flex flex-col lg:flex-row items-center justify-between overflow-hidden",children:[e.jsxs("div",{className:"flex-1 space-y-6 px-6 sm:px-12 py-10 lg:pl-30 mt-10 sm:mt-0",children:[e.jsx("div",{className:`transform transition-all duration-800 ease-out ${n?"translate-x-0 opacity-100":"-translate-x-10 opacity-0"}`,children:e.jsx("p",{className:"text-lg text-[#3369E3] font-medium mb-2",style:{fontFamily:"gilroy"},children:"DEBT RESOLUTION"})}),e.jsxs("h1",{className:"text-3xl sm:text-6xl font-extrabold text-[#111827] mb-4 leading-tight",style:{fontFamily:"Youth"},children:[e.jsx("div",{className:"mb-2",children:e.jsx(v,{text:"Debt Resolution Services",className:"text-4xl sm:text-6xl block",delay:0})}),e.jsx("div",{children:e.jsx(v,{text:"Across India",className:"text-4xl sm:text-6xl text-[#3369E3] block",delay:400})})]}),e.jsx("div",{className:"mb-6 overflow-hidden",children:e.jsx("div",{className:`transform transition-all duration-1000 ease-out ${d?"translate-x-0 opacity-100":"-translate-x-10 opacity-0"}`,children:e.jsx("p",{className:"text-[#4B5563] text-sm sm:text-base w-full",style:{fontFamily:"gilroy"},children:e.jsx(N,{text:"Are credit card bills, personal loans, or multiple EMIs making life stressful? At DEBTFRIE, we help you take control of your finances and become debt-free—without taking another loan. Our experts guide you through every step, from negotiation to settlement, so you can regain peace of mind and financial freedom.",className:"text-lg sm:text-xl font-semibold"})})})}),e.jsx("div",{className:`transform transition-all duration-1000 ease-out ${x?"translate-y-0 opacity-100 scale-100 rotate-0":"translate-y-10 opacity-0 scale-90 rotate-2"}`,children:e.jsxs("button",{className:"bg-[#3369e3] hover:bg-[#2558d6] text-white text-sm px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl transform hover:rotate-1 active:scale-95 group",style:{fontFamily:"gilroy"},children:[e.jsx("span",{className:"transition-all duration-300 group-hover:tracking-wider",children:"GET STARTED"}),e.jsx("span",{className:"text-white text-lg transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125",children:"→"})]})})]}),e.jsx("div",{className:"flex-1 w-full h-full p-0 relative overflow-hidden",children:e.jsxs("div",{className:`transform transition-all duration-1200 ease-out ${n?"translate-x-0 opacity-100 scale-100":"translate-x-20 opacity-0 scale-105"}`,children:[e.jsx("img",{src:u.Women,alt:"Hero Visual",className:"w-full h-full object-cover p-0 m-0 mt-9 sm:mt-36 hover:scale-105 transition-transform duration-700"}),e.jsx("div",{className:`absolute top-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 transition-all duration-1000 ${n?"animate-bounce":""}`}),e.jsx("div",{className:`absolute bottom-32 left-10 w-12 h-12 bg-indigo-200 rounded-full opacity-30 transition-all duration-1000 delay-500 ${n?"animate-pulse":""}`})]})}),e.jsx("style",{jsx:!0,children:`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `})]})};function V(){return e.jsxs(F,{children:[e.jsx("title",{children:"Debt Resolution Services India | Debtfrie"}),e.jsx("meta",{name:"description",content:"Resolve credit card, personal & business loan debt with Debtfrie's expert negotiators. Legal, one-time settlements to reduce your total dues."}),e.jsx("link",{rel:"canonical",href:w("/debt-resolution")}),e.jsx("meta",{property:"og:title",content:"Debt Resolution Services India | Debtfrie"}),e.jsx("meta",{property:"og:description",content:"Resolve credit card, personal & business loan debt with Debtfrie's expert negotiators. Legal, one-time settlements to reduce your total dues."}),e.jsx("meta",{property:"og:url",content:w("/debt-resolution")}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${w("/debt-resolution")}#service`,name:"Legal Debt Resolution & Settlement",provider:{"@type":"Organization",name:"Debtfrie",url:w("/")},serviceType:"Debt Relief Services",offers:{"@type":"Offer",price:"49.00",priceCurrency:"INR",description:"Initial Free/Paid Consultation & Debt Assessment"},description:"Settle your credit card debts and personal loans legally through creditor negotiations led by expert financial advisors and advocates."},{"@type":"FAQPage",mainEntity:[{"@type":"Question",name:"How does the Debtfrie debt resolution process function?",acceptedAnswer:{"@type":"Answer",text:"Debtfrie negotiates with creditors on behalf of clients to reduce outstanding amounts, reschedule payments, or restructure debt, aiming for a mutually agreeable solution."}},{"@type":"Question",name:"Is the practice of debt settlement legally recognized in India?",acceptedAnswer:{"@type":"Answer",text:"Yes, debt settlement is legally permitted when done through mutual agreement between borrower and creditor, though it may affect credit scores."}},{"@type":"Question",name:"Does participating in a debt settlement program affect my credit score?",acceptedAnswer:{"@type":"Answer",text:"Your credit score will get affected temporarily, however it will be rebuildable with the expert financial advisory at Debtfrie."}}]}]})}),e.jsx(O,{}),e.jsx(Y,{}),e.jsx(L,{}),e.jsx(H,{}),e.jsx(P,{}),e.jsx(W,{}),e.jsx(B,{}),e.jsx($,{}),e.jsx(T,{page:"debt-resolution",limit:5,showButton:!1})]})}export{V as default};
