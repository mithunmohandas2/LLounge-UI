import { useEffect, useState } from 'react'
import './slideEffect.css'
function ContactForm() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const card = document.getElementById('animatedCard');
            if (!card) return;

            const cardPosition = card.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 200;

            setIsVisible(cardPosition < triggerPoint);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="max-w-md  mx-auto my-4 flex flex-col items-center sm:justify-center sm:gap-3">

            <a href="mailto:mail.learnerslounge@gmail.com" target='_blank' className='p-3'>
                <button className='bg-slate-200 p-4 text-slate-900 rounded-2xl hover:bg-slate-300 flex gap-2 w-fit'> <img style={{width:25}} src="https://cdn-icons-png.flaticon.com/512/888/888853.png" alt="Email" /> <h5>mail.learnerslounge@gmail.com</h5></button>
            </a>

            <a href="tel:+919846232252" target='_blank'>
                <button className='sm:w-fit bg-slate-200 p-4 text-slate-900 rounded-2xl hover:bg-slate-300 flex gap-2 w-fit'> <img style={{width:25}} src="https://icon-library.com/images/call-icon-android/call-icon-android-6.jpg" alt="phone" /> <h5>+91 - 9846232252</h5></button>
            </a>

            <div className="container">
                <div className={`card ${isVisible ? 'visible' : ''}`} id="animatedCard">
                    <a href="#banner">
                        <p>▲ Top</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ContactForm