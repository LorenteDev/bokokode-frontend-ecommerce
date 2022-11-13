import CategoryTerm from './CategoryTerm'
import DirectionTerm from './DirectionTerm'
import OrderTerm from './OrderTerm'

interface BodyParameters {
  sort: {
    key: OrderTerm,
    type: DirectionTerm
  },
  categories: Array<CategoryTerm>
}

export default BodyParameters