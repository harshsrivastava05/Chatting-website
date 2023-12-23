import { useEffect, useState } from "react";
import { Avatar, Avatar2, Link, Phone, Send, Video } from "../../assets/avatar";
import { Input } from "../../components/inputs";
import axios from "axios";

export const Dashboard = () => {
  const contacts = [
    {
      name: "harsh",
      description: "avalable",
      image: <Avatar2 />,
    },
    {
      name: "manya",
      description: "avalable",
      image: <Avatar2 />,
    },
    {
      name: "aryan",
      description: "avalable",
      image: <Avatar2 />,
    },
    {
      name: "arsh",
      description: "avalable",
      image: <Avatar2 />,
    },
    {
      name: "anya",
      description: "avalable",
      image: <Avatar2 />,
    },
    {
      name: "arya",
      description: "avalable",
      image: <Avatar2 />,
    },
  ];

    useEffect(() => {
    const fetchConversations = async () => {
      try {
        const isLoggedUser = JSON.parse(localStorage.getItem("user:details"));
        const res = await axios.get(`http://localhost:3000/api/conversation/${isLoggedUser.id}`);
        const resData = res.data;
        setconversation(resData);
      } catch (error) {
        console.error("Axios error: ", error);
      }
    };

    fetchConversations();
  }, []);

  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user:details")));
  const [conversation, setconversation] = useState([])
  console.log(user)

  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen bg-slate-200 ">
        <div className="flex justify-center my-6 items-center">
          <Avatar />
          <div className="ml-4">
            <h3 className="text-2xl">{user.fullname}</h3>
            <p className="text-lg font-light">{user.email}</p>
          </div>
        </div>
        <hr />
        <div className="mx-10">
          <div className="flex justify-center pl-10 font-semibold text-sky-50û text-xl">
            Messages
          </div>
          <div>
            {contacts.map(({ name, description, image }) => {
              return (
                <div className="flex mt-7 pl-7 border border-b-gray-400 pb-[12px] cursor-pointer items-center">
                  <div className="border p-1 border-black rounded-full">
                    {image}
                  </div>
                  <div className="ml-2">
                    <h3 className="text-lg">{name}</h3>
                    <p className="text-sm font-light text-gray-600">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        <div className="bg-slate-200 w-[75%] h-[120px] shadow-sm rounded-full my-4 flex items-center px-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex justify-center cursor-pointer">
              <Avatar />
              <div className="ml-3">
                <h3 className="text-lg">Harsh</h3>
                <p className="text-sm font-light mt-[-7px] text-gray-600">
                  online
                </p>
              </div>
            </div>
            <div className="mr-6 flex cursor-pointer space-x-4">
              <Phone />
              <Video />
            </div>
          </div>
        </div>
        <div className="w-full max-h-[90%] border border-b overflow-auto">
          <div className="p-12 h-[1000px]">
            <div className="p-4 max-w-[45%] bg-slate-200 mb-4 rounded-b-2xl rounded-tr-2xl">
              To create a production buildTo create a production buildTo create
              a production build
            </div>
            <div className="p-4 min-w-[50px ] text-white max-w-[45%] bg-sky-500 mb-4 rounded-b-2xl rounded-tl-2xl mt-4 ml-auto">
              To create a production buildTo create a production build
            </div>
          </div>
        </div>

        <div className="p-4 w-[80%] flex items-center justify-between ">
          <Input
            placeholder="Type a message.."
            inputClassname="w-full border rounded-full outline-none  shadow-lg"
            className="w-full"
          />
          <div className="p-2 ml-4 mb-4 w-12 rounded-3xl bg-sky-400 mt-6 cursor-pointer border">
            <Link />
          </div>
          <div className="p-2 mb-4 ml-2 w-12 rounded-3xl bg-sky-400 mt-6 cursor-pointer border">
            <Send />
          </div>
        </div>
      </div>

      <div className="w-[25%] h-screen"></div>
    </div>
  );
};
