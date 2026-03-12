import { Link } from "react-router-dom";
import { constant } from "../constant/index.constant";

const Thankyou = () => {
    return (
        <>
        <div className="container-fluid thanks_you_page_heder" style={{ backgroundImage: "url('/assets/img/Background.png')" }}>
               
            <div className="thank_you_pafe header-inner">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12">
                        <div className="logo-sec text-center">
                            <Link to="/">
                                <img src="assets/img/ga-logo.svg" alt="Gateway Abroad Logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-7">
                        <h1 className="heading thanks_text text-center">
                            Thank You for Reaching Out to Gateway Abroad!
                        </h1>
                    </div>
                    <div className="col-7 thanks_small_text">
                        Thank you for submitting the form! Our expert consultant will review your details and reach out to you soon.
                        In the meantime, feel free to explore our services or contact us for any immediate questions.
                    </div>
                </div>
            </div>
            <div className="absolute_thanks">
                <div className="thanks_bottom_button">
                    <a href={constant.REACT_APP_URL} className="text-black" target="_blank" rel="noopener noreferrer"> Stay tuned for exciting opportunities!</a>
                </div>
                <span className="mt-2 d-flex justify-content-center">
                    Get social
                </span>
                <ul className="d-flex list-unstyled justify-content-evenly align-items-center thanks_footer_block">
                    <li><Link to="https://www.facebook.com/gagatewayabroadjaipur?mibextid=ZbWKwL" target="_blank"><i className="fa fa-facebook" /></Link></li>
                    <li><Link to="https://www.youtube.com/@GatewayAbroadJaipur" target="_blank"><i className="fa fa-youtube" /></Link></li>
                    <li><Link to="https://api.whatsapp.com/send?phone=8302092630" target="_blank"><i className="fa fa-whatsapp" /></Link></li>
                    <li><Link to="https://www.instagram.com/testprep_with_gatewayjaipur/" target="_blank"><i className="fa fa-instagram" /></Link></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Thankyou;
