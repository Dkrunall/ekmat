import Popup from "@/components/common/Popup";

// This is a server component that decides whether to render the popup
const PopupWrapper = ({ isHomePage }) => {
  // Only render the popup on the home page
  if (!isHomePage) {
    return null;
  }
  
  return <Popup />;
};

export default PopupWrapper;