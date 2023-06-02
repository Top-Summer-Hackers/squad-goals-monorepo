import Link from "next/link";
import type { NextPage } from "next";
import { FiChevronRight } from "react-icons/fi";

const Home: NextPage = () => {
  return (
    <main>
      {/* first row */}
      <div className="min-h-[350px] py-10 bg-landing-box1">
        <div className="max-w-[1980px] mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 w-[80%]">
          {/* description + go to app */}
          <div className="flex flex-col justify-center lg:w-[60%] mx-auto">
            {/* upper description */}
            <div className="text-center lg:text-left text-lg font-semibold">
              A unique blend of blockchain technology, social community, and a game-like system designed to promote
              self-improvement and growth
            </div>
            {/* go to app and launch button */}
            <div className="mt-5 flex-center gap-5">
              <Link href={"/app"}>
                <div className="group cursor-pointer h-10 w-fit flex-center bg-white rounded-full px-5 py-1">
                  go to app <FiChevronRight className="group-hover:translate-x-1 transition mt-0.5" />
                </div>
              </Link>
              <Link href={"/launch"}>
                <div className="group cursor-pointer h-10 gap-2 w-fit flex-center bg-white rounded-full px-5 py-1">
                  launch{" "}
                  <img
                    src="launch.png"
                    alt=""
                    className="h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition mt-0.5"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex-center">
            <img src="/landing/exhibition1.png" alt="" className="w-[50%]" />
          </div>
        </div>
      </div>
      {/* second row */}
      <div className="min-h-[350px] py-10 bg-landing-bg-main">
        <div className="max-w-[1980px] mx-auto flex flex-col lg:grid lg:grid-cols-2 w-[80%]">
          <div className="flex-center">
            <img src="/landing/exhibition2.png" alt="" className="w-[50%]" />
          </div>
          <div className="flex flex-col justify-center lg:w-[60%] mx-auto">
            <div className="flex gap-2">
              <div className="text-4xl font-semibold">1.</div>
              <div className="text-lg font-semibold">
                Dive into our dynamic &quot;Squads,&quot; intimate groups of 2-7 individuals, each dedicated to setting
                and pursuing SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* third row */}
      <div className="min-h-[350px] py-10 bg-landing-box-2">
        <div className="max-w-[1980px] mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 w-[80%]">
          <div className="flex flex-col justify-center lg:w-[60%] mx-auto">
            <div className="mt-10 lg:mt-0 flex gap-2">
              <div className="text-4xl font-semibold">2.</div>
              <div className="text-lg font-semibold">
                Show your commitment by staking a specific amount of xDAI. This cryptocurrency is securely locked in a
                smart contract, held safely until your goal&apos;s deadline.
              </div>
            </div>
          </div>
          <div className="flex-center">
            <img src="/landing/exhibition3.png" alt="" className="w-[50%]" />
          </div>
        </div>
      </div>
      {/* fourth row */}
      <div className="min-h-[350px] py-10 bg-landing-bg-main">
        <div className="max-w-[1980px] mx-auto flex flex-col lg:grid lg:grid-cols-2 w-[80%]">
          <div className="flex-center">
            <img src="/landing/exhibition4.png" alt="" className="w-[60%]" />
          </div>
          <div className="flex flex-col justify-center lg:w-[60%] mx-auto">
            <div className="flex gap-2">
              <div className="text-4xl font-semibold">3.</div>
              <div className="text-lg font-semibold">
                Strive to achieve your goal before the deadline. The journey towards your goal is a shared experience,
                with each member doing their utmost to succeed.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fifth row */}
      <div className="min-h-[350px] py-10 bg-landing-box-2">
        <div className="max-w-[1980px] mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 w-[80%]">
          <div className="flex flex-col justify-center lg:w-[60%] mx-auto">
            <div className="flex gap-2">
              <div className="text-4xl font-semibold">4.</div>
              <div className="text-lg font-semibold">
                Upon reaching the deadline, a vote is held. If you&apos;ve achieved your goal and secured a majority of
                votes, you&apos;ll not only reclaim your staked xDAI but also win the stake lost by others, and bask in
                the glory of becoming an owner of the coveted Challenge NFT. If not, the stake is forfeited, but the
                experience and lessons learned are yours to keep.
              </div>
            </div>
          </div>
          <div className="flex-center">
            <img src="/landing/exhibition5.png" alt="" className="w-[50%]" />
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="py-10 bg-landing-bg-main">
        <div className="max-w-[1980px] mx-auto">
          <div className="grid grid-cols-3 w-[80%] mx-auto">
            <div className="mt-2 flex flex-col gap-3">
              <div className="font-semibold underline cursor-pointer">github</div>
              <div className="font-semibold underline cursor-pointer">twitter</div>
              <div className="font-semibold underline cursor-pointer">opensea</div>
              <div className="font-semibold underline cursor-pointer">producthunt</div>
            </div>
            <div className="place-self-center">
              <img src="/footer.png" alt="" className="w-[60%] mx-auto" />
            </div>
            <div className="ml-auto">
              <div className="cursor-pointer w-full grid grid-cols-2 items-center">
                <div className="ml-auto">app</div>
                <div>
                  <img src="/app.png" alt="" className="ml-3 w-10" />
                </div>
              </div>
              <div className="cursor-pointer w-full grid grid-cols-2 items-center">
                <div className="ml-auto">challenges</div>
                <div>
                  <img src="/challenge.png" alt="" className="ml-3 w-10" />
                </div>
              </div>
              <div className="cursor-pointer w-full grid grid-cols-2 items-center">
                <div className="ml-auto">launch</div>
                <div>
                  <img src="/launch.png" alt="" className="ml-3 w-10" />
                </div>
              </div>
              <div className="cursor-pointer w-full grid grid-cols-2 items-center">
                <div className="ml-auto">dashboard</div>
                <div>
                  <img src="/dashboard.png" alt="" className="ml-3 w-10" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center font-medium">built with 🔥 in Bali</div>
        </div>
      </div>
    </main>
  );
};

export default Home;
