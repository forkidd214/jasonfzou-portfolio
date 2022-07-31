type InputProps = {
  year?: number | undefined
}

export default function Input(props: InputProps) {
  const { year: date } = props
  return <div>{date}</div>
}
