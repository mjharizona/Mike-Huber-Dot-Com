import PremiumHeader from '@/components/premium/PremiumHeader';
import PremiumFooter from '@/components/premium/PremiumFooter';
import SessionLinks from '@/components/premium/SessionLinks';
import CookieNotice from '@/components/premium/CookieNotice';
import '@/app/premium.css';
export default function SiteLayout({children}:{children:React.ReactNode}){return <div className="premium-site"><a className="skip-link" href="#main">Skip to content</a><PremiumHeader/><main id="main">{children}</main><PremiumFooter/><SessionLinks/><CookieNotice/></div>}
