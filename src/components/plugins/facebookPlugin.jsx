import { useEffect } from "react";

const FacebookPagePlugin = () => {
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v22.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        window.FB?.XFBML.parse();
      };
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="rounded-md border p-4 max-h-[550px] h-full">
      <div id="fb-root"></div>
      <div
        className="fb-page" 
        data-href="https://www.facebook.com/profile.php?id=100049218595454"
        data-tabs="timeline"
        data-width="400"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/profile.php?id=100049218595454"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/profile.php?id=100049218595454">
            Academia Galoiss - Andahuaylas
          </a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPagePlugin;
