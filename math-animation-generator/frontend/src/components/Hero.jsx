import heroImg from "../assets/conceptual-idea.svg"

const Hero = () => {
  return (
    <div>
      <div>
        <article>
          <h3 className="text-2xl font-bold text-zinc-300 text-center pb-5">Turning Ideas into Reality</h3>
        </article>
        <article>
          <img src={heroImg} />
        </article>
      </div>
    </div>
  )
}
export default Hero