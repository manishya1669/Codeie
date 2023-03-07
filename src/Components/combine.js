import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import codeChef from "../Components/Images/codechef.png";
import leet from "../Components/Images/Leetcode.png";
import logo from "../Components/Images/panda.gif";
import atcoder from "../Components/Images/Atcoder.png";
import googleKS from "../Components/Images/GoogleKS.png";
import codeforces from "../Components/Images/Codeforces.png";
import hearth from "../Components/Images/earth.png";
import hrank from "../Components/Images/hckerrank.png";



function Combine() {
  const [platform, setPlatform] = useState(null);
  const [datas, setData] = useState([]);
  const [img, setImg] = useState();
  const Plate = [
    { name: "leet_code", label: "LeetCode", img: leet },
    { name: "codeforces", label: "CodeForces", img: codeforces },
    { name: "code_chef", label: "CodeChef", img: codeChef },
    { name: "hacker_rank", label: "HackeRank", img: hrank },
    { name: "hacker_earth", label: "HackerEarth ", img: hearth },
    { name: "at_coder", label: "AtCoder", img: atcoder },
    { name: "kick_start", label: "Google_kickStart", img: googleKS },
    { name: "cs_academy", label: "CS Academy", img: leet },
  ];
  useEffect(() => {
    const baseUrl = "https://kontests.net/api/v1/";

    async function getVal() {
      const res = await axios.get(`${baseUrl}${platform}`);
      setData(res.data);
      console.log(datas);
      console.log(datas[0].status);
    }
    getVal();
  }, [platform]);

  const options = { day: "numeric", month: "long", year: "numeric" };

  function days(date1) {
    const currentDate = new Date();
    const givenDate = new Date(date1);
    const diff = givenDate.getTime() - currentDate.getTime();
    console.log("first:", diff);
    const daysDiff = Math.ceil(diff / (1000 * 3600 * 24));
    console.log(daysDiff);
    return (
      <div className="flex ">
        <h1>{daysDiff}</h1>
        <p className="text-gray-500 px-2 text-xs pt-1"> Days to GO</p>
      </div>
    );
  }
  function displayLogo() {
    console.log("logoDisplayed");
    return (
      <div>
        <p className="pt-10">NO CONTEST FOUND... </p>
        <img className=" h-[30%] w-[70%] md:h-[40%] md:w-[40%] p-20 mx-auto " src={logo} alt="logo" />
      </div>
    );
  }
  return (
    <div className=" bg-[#ebf3dc]">
      <div>
        <Select
          options={Plate}
          onChange={function (obj) {
            setPlatform(obj.name);
            setImg(obj.img);
          }}
        />
      </div>
      {datas.length === 0 ? (
        displayLogo()
      ) : (
        <div className="p-1 m-3 ">
          <div className="bg-white rounded-md shadow-md  p-10 sm:p-0">
            {datas?.map((da) => (
              <div className=" p-3 shadow-md flex max-w-full    transform transition duration-500 hover:scale-105">
                <div className=" rounded-md p-2  ">
                  <img className="h-30 w-40 " src={img} alt="img" />
                </div>

                <div className="max-w-full w-[90%] md:w-[30%]  ">
                  <p>{days(da.start_time)}</p>
                  <h1 className="md:text-2xl  text-2xl">{da.name}</h1>
                 
                  <div className=" p-3  ">
                    <div className="flex pb-3 gap-2">
                      <p className="w-full items-end">
                        {new Date(da.start_time).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </p>
                      <p className="w-full  items-end">
                        {new Date(da.start_time).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </p>
                    </div>
                    <div className="bg-gray-400 rounded pt-2  transform transition duration-500 hover:scale-105  md:mt-20 md:w-[100%] ">
                      <a href={da.url}>Let's Go</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Combine;
