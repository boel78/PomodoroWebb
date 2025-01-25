import LandingPageNav from "../components/LandingPageNav";
import LandingPageFooter from "../components/LandingPageFooter";
import { Button } from "../components/ui/button";
import {
  SquareCheckBig,
  ClipboardList,
  BicepsFlexed,
  Gamepad2,
} from "lucide-react";
export default function Home() {
  return (
    <div>
      <LandingPageNav />
      <section className="py-20 px-6 bg-gradient-to-r from-tomato-500 to-tomato-700 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Get going with Pomodoro-Buddy!
          </h1>
          <p className="text-lg w-3/4">
            Pomodoro-Buddy is a powerful tool designed to help you manage your
            time and work more efficiently. Its innovative approach ensures you
            stay focused on your tasks while taking well-timed breaks—making
            productivity simple and effective.
          </p>
          <Button
            variant="outline"
            className="bg-white text-lg text-gray-700 hover:bg-gray-100 hover:text-tomato-700 mt-8"
          >
            <a href="/login">Get Started</a>
          </Button>
        </div>
      </section>
      <section id="features">
        <div className="max-w-100vw mx-auto py-20 px-6 bg-tomato-50">
          <h2 className="text-3xl font-bold mb-8 text-center text-tomato-800">
            Features of Pomodoro-Buddy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 gap-2">
                <SquareCheckBig className="w-12 h-12 text-tomato-700" />
                <h3 className="text-2xl font-bold text-tomato-700">
                  Focus on your tasks
                </h3>
              </div>
              <p>
                Pomodoro-Buddy helps you stay focused on your tasks by breaking
                them into manageable intervals. It automatically schedules
                Pomodoro sessions and tailors work and break durations to match
                your preferences, ensuring you remain productive and motivated
                throughout the day.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 gap-2">
                <ClipboardList className="w-12 h-12 text-tomato-700" />
                <h3 className="text-2xl font-bold text-tomato-700">
                  Track your progress
                </h3>
              </div>
              <p>
                With Pomodoro-Buddy, you can track your progress and see how
                much time you spend on each session. This feature helps you stay
                organized and focused on your goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 gap-2">
                <BicepsFlexed className="w-12 h-12 text-tomato-700" />
                <h3 className="text-2xl font-bold text-tomato-700">
                  Stay motivated
                </h3>
              </div>
              <p>
                Pomodoro-Buddy keeps you motivated by tracking your productivity
                and presenting detailed weekly statistics. By visualizing the
                time you've spent focused on your tasks, it helps you celebrate
                your progress and encourages you to stay consistent. With
                insights into your achievements, Pomodoro-Buddy inspires you to
                push further and maintain your momentum.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 gap-2">
                <Gamepad2 className="w-12 h-12 text-tomato-700" />
                <h3 className="text-2xl font-bold text-tomato-700">
                  Gameify productivity
                </h3>
              </div>
              <p>
                Pomodoro-Buddy keeps you motivated by turning productivity into
                a game! With streaks to maintain and achievements to unlock,
                every focused session brings you closer to your next milestone.
                Stay on track, challenge yourself, and make work more
                rewarding—because who said productivity can’t be fun?
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials">
        <div className="max-w-screen mx-auto py-20 px-6 bg-tomato-50">
          <h2 className="text-3xl font-bold mb-8 text-center text-tomato-800">
            What our users are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">
                "Pomodoro-Buddy has been a game-changer for me. It's helped me
                stay focused and motivated throughout the day, and I've seen a
                significant improvement in my productivity. I highly recommend
                it to anyone looking to manage their time more effectively."
              </p>
              <p className="mt-4 font-bold">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">
                "I've tried several productivity tools in the past, but
                Pomodoro-Buddy is by far the best. It's simple to use, and the
                Pomodoro technique has made a huge difference in how I approach
                my work. I love the gamification aspect—it keeps me motivated
                and engaged."
              </p>
              <p className="mt-4 font-bold">- Jane Smith</p>
            </div>
          </div>
        </div>
      </section>
      <LandingPageFooter />
    </div>
  );
}
