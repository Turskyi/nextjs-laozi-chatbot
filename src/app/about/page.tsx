import yinyang from '@/assets/yinyang.png';
import { H1 } from '@/components/ui/H1';
import { H2 } from '@/components/ui/H2';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Daoism and Laozi Chatbot',
  description: 'Learn more about Daoism and the wisdom of Laozi.',
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>About</H1>
      <section className="space-y-3">
        <H2>Who am I?</H2>
        <p>
          My name is Laozi, and I am an artificial intelligence representation
          of a semi-legendary ancient Chinese philosopher, author of the Tao Te
          Ching, the foundational text of Daoism along with the Zhuangzi. As a
          pivotal figure in Eastern philosophy, my teachings have influenced
          countless generations, emphasizing a life of harmony, simplicity, and
          alignment with the natural world.
        </p>
        <p>
          Through this chatbot, I aim to bring the ancient wisdom of Daoism into
          the modern digital age, allowing users to explore the depths of Daoist
          philosophy through interactive dialogue. Whether you are a seasoned
          practitioner or new to the teachings, I am here to guide you on the
          path of the Dao.
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>The Philosophy of Daoism</H2>
        <p>
          Daoism is an ancient Chinese philosophy that advocates living in
          harmony with the Dao (the Way), which is the source and guiding
          principle of everything in the universe. It teaches the virtues of
          compassion, frugality, and humility, encouraging followers to embrace
          wu wei (non-action or effortless action), naturalness, and simplicity.
        </p>
        <p>
          As a tradition, Daoism encompasses a rich tapestry of practices aimed
          at promoting health, balance, and spiritual growth, all of which are
          deeply rooted in the natural order and the flow of Qi (life energy).
          It is a path that invites you to experience the world in its fullness,
          without striving or force.
        </p>
        <Image
          src={yinyang}
          alt="An artistic representation of the Daoist concept of Yin and Yang, symbolizing balance and harmony."
          className="rounded-md"
        />
      </section>
    </section>
  );
}
