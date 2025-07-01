import { useCrowdfunding } from "../contexts/CrowdfundingContext"

export default function FundButton({ tierIndex, amount }) {
  const { fund } = useCrowdfunding()

  const handleFund = () => {
    fund(tierIndex, amount.toString())
  }

  return (
    <button onClick={handleFund}>
      Fund Tier {tierIndex + 1}
    </button>
  )
}
