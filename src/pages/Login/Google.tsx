import { useState } from "react";
import { Button } from "antd";
import { sendTA } from "@/assets/js/TA";
import Cookies from "js-cookie";
import { generateCryptoRandomState } from "@/assets/js/utils";
import { googleId, googleRedirectUrl } from "@/api";
import { useSearchParams } from "react-router-dom";

export function Google({ from }: { from: string }) {
  const [searchParams] = useSearchParams() as any;

  const redirectUrl = decodeURIComponent(
    `${searchParams.get("r") ?? "/center"}`
  );

  const [googleLoading, setGoogleLoading] = useState(false);
  /**谷歌登录 */
  function gooogleLoginFn() {
    sendTA("XWEB_CLICK", {
      name: from,
      style: "google_login",
      container: Cookies.get("userId"),
    });
    setGoogleLoading(true);
    const state = generateCryptoRandomState();
    // www.chatbond.co 和chatbond.co的localstorage不互通，所以存在cookie里

    Cookies.set("allyFyGoogleState", state, {
      domain:
        import.meta.env.VITE_RUN_ENV == "prod"
          ? ".chatbond.co"
          : ".aecoapps.com",
    });

    Cookies.set("allyFyGoogleRedirectUrl", redirectUrl, {
      domain:
        import.meta.env.VITE_RUN_ENV == "prod"
          ? ".chatbond.co"
          : ".aecoapps.com",
    });

    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    const params = {
      client_id: googleId,
      redirect_uri: googleRedirectUrl,
      scope: "email openid profile",
      state: state,
      include_granted_scopes: "true",
      response_type: "code",
    } as any;

    for (const p in params) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <Button
      style={{
        background: "linear-gradient(90deg, #83e10a 0%, #0ac655 100%)",
      }}
      className="w-full !h-10 !mb-4 !text-4 !text-white !fw-700 !rounded-2 text-center !b-0 !fcc"
      onClick={gooogleLoginFn}
      loading={googleLoading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
        className="mr-2 h-5 w-5"
      >
        <defs>
          <path
            id="a"
            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          ></path>
        </defs>
        <clipPath id="b">
          <use xlinkHref="#a" overflow="visible"></use>
        </clipPath>
        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
        <path
          clipPath="url(#b)"
          fill="#EA4335"
          d="M0 11l17 13 7-6.1L48 14V0H0z"
        ></path>
        <path
          clipPath="url(#b)"
          fill="#34A853"
          d="M0 37l30-23 7.9 1L48 0v48H0z"
        ></path>
        <path
          clipPath="url(#b)"
          fill="#4285F4"
          d="M48 48L17 24l-4-3 35-10z"
        ></path>
      </svg>

      <span className="h-5 leading-5">Google</span>
    </Button>
  );
}
