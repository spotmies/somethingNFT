import React, { useRef, useState } from "react";
import { MdCached, MdSearch } from "react-icons/md";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import constants from "../components/constants";
export default function Verify() {
  const emailRef = useRef(null);
  const [isWhiteList, setisWhiteList] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const checkWhiteList = () => {
    setisLoading(true);
    // setisWhiteList(null);
    setTimeout(() => {
      let email = emailRef?.current?.value;
      email = email.toLowerCase();
      if (email === "") {
        setisWhiteList(null);
      } else {
        //check if email is in white list
        let isWhiteList = false;
        constants.whiteList.forEach((item) => {
          if (item.toLowerCase() === email.toLowerCase()) {
            isWhiteList = true;
          }
        });
        setisWhiteList(isWhiteList);
      }
      setisLoading(false);
    }, 1000);
  };

  function inputField(placeHolder) {
    return (
      <div className="center-div">
        <div className="input-div">
          <FormControl className="form-controler">
            <InputBase
              // id="outlined-adornment-password"
              inputRef={emailRef}
              type="text"
              placeholder={placeHolder}
              className="newsletter-input agency-font"
              endAdornment={
                <InputAdornment position="end" className="input-adornment">
                  {!isLoading ? (
                    <MdSearch className="input-icon" onClick={checkWhiteList} />
                  ) : (
                    <MdCached className="input-icon" />
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    );
  }

  return (
    <div className="agency-font row-space-even">
      <div className="center-div">
        {inputField("Check your wallet address ")}
      </div>
      {isWhiteList && (
        <div className="you-in-wl">
          <img
            src="/images/jumpman.png"
            alt="character"
            className="char-image"
          />
          <p>You are whitelisted</p>
        </div>
      )}
      {isWhiteList == false && (
        <div className="you-not-in-wl">
          <img src="/images/char1.png" alt="character" className="char-image" />
          <p>You are not whitelisted</p>
        </div>
      )}
    </div>
  );
}
