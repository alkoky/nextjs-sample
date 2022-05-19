import Head from "next/head"
import Image from "next/image"
import Link from "next/link";
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import  cdp from '../public/cdp-demo'
import { useEffect } from 'react'
import { initClientScript , sendIdentityByEmailEvent , sendViewEvent } from 'react-sitecore-personalize'
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css'

export default function Home({  }) {

        // This binding is necessary to make `this` work in the callback
    function sendIdentity  ()  {
        sendIdentityByEmailEvent('/', 'hello');
    }


    const client_key= 'psfu6uh05hsr9c34rptlr06dn864cqrx'; // Replace with your client key
    const api_target= 'https://api.boxever.com/v1.2'; // Replace with your API target endpoint specific to your data center region
    const cookie_domain='.vercel.app'; // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
    const web_flow_target= "https://d35vb5cccm4xzp.cloudfront.net";
    const pointOfSale="aenextjsdemo" ;//Boxever.pointOfSale,

    function handleOptionChange(e) {
        
    }

      useEffect(()=>{
        initClientScript(client_key,cookie_domain,api_target,'1.4.6',pointOfSale,web_flow_target, {LogEvents:true,Currency:'USD',Language:'EN',Channel:'WEB'});

        //$('.cdpButton').onclick  =  sendIdentity;
        document.getElementById('cdpbtn-midwest').onclick  =  sendIdentity;
        document.getElementById('cdpbtn-west').onclick  =  sendIdentity;

        //sendViewEvent('/');
        console.info(document.getElementById('cdpbtn'));
        function sendIdentity(email) {
          //  console.log('You clicked sendidentity',this.value);
            //cdp.sendIdentity(email);
            //cdp.sendidentity(email);
            //console.log('You clicked sendidentity');
           
            const page = '/';
    
            //sendIdentityByEmailEvent('/', 'naim.al@americaneagle.com');
            cdp.sendIdentity(this.value);
           // cdp.personalize();
    
         //   console.log('You clicked sendidentity!!!');
           
          }
    })

  return (
    <><div>
          <Head>
              <title>Notion Next.js blog</title>
              <link rel="icon" href="/favicon.ico" />
          </Head>
         
          <main className={styles.container}>
              <header className={styles.header}>
                  <div className={styles.logos}>
                      <Image src="/logo.png" alt="logo" width={315} height={67} />
                      <path
                          d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"
                          fillRule="evenodd"
                          fill="currentColor" />
                  </div>
                 

              </header>
              <div className="container-fluid">
              <div className="row">
                <div className="col-sm-7"></div>
                <div className="col-sm">
                  <button className='cdpButton' id="cdpbtn-west" value='thor.odinsson@avengers.gov'>
                        west
                        </button>
                        &nbsp;
                      <button className="cdpButton" id='cdpbtn-midwest' type="button" value='naim.al@americaneagle.com' >
                      midwest
                          </button>
                      
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-2">
                    <div id='product-image-div' className="brand-photo"><Image id='product-image' src="/EJ_default_img.JPG" alt="product"  width={315} height={500}/></div>
                </div>
                <div className="col-sm-4">
                <div className="detail">
                          <h2 id="product-title" className="lined gold">Welcome to E&J Gallo Winery</h2>
                          <p id="product-body">From our humble beginnings, the hallmark of our company has been an unwavering commitment to quality. By taking the utmost care through each and every step of the grape growing and winemaking process, we are able to consistently deliver world-class wines, spirits, and other alcoholic beverages for every occasion. Today we are recognized as one of the leading global producers of these products, both in the art of grape growing and wine and spirits making and also in the distribution and marketing of these products in more than 100 countries around the globe.</p>
                      </div>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
          </main>
      </div>
       </>
    
  );
}
 
  
export const getStaticProps = async () => {
  return {props:{'title':'1','content':'sss'}}
};