import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
} from 'react'

interface AccordionContextValue {
  openItem: string | null
  toggleItem: (value: string) => void
}

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionContext() {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('Accordion components must be inside Accordion.Root')
  return context
}

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext)
  if (!context) throw new Error('Accordion.Header or Panel must be inside Accordion.Item')
  return context
}

function Root({ children }: PropsWithChildren) {
  const [openItem, setOpenItem] = useState<string | null>('compound')

  return (
    <AccordionContext.Provider
      value={{ openItem, toggleItem: (value) => setOpenItem(openItem === value ? null : value) }}
    >
      <div className="accordion-root">{children}</div>
    </AccordionContext.Provider>
  )
}

function Item({ value, children }: PropsWithChildren<{ value: string }>) {
  const { openItem } = useAccordionContext()
  return (
    <AccordionItemContext.Provider value={{ value, isOpen: openItem === value }}>
      <section className={`accordion-item ${openItem === value ? 'is-open' : ''}`}>{children}</section>
    </AccordionItemContext.Provider>
  )
}

function Header({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
  const { toggleItem } = useAccordionContext()
  const { value, isOpen } = useAccordionItemContext()

  return (
    <button
      {...props}
      className="accordion-header"
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggleItem(value)}
    >
      <span>{children}</span>
      <span className="accordion-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
    </button>
  )
}

function Panel({ children }: PropsWithChildren) {
  const { isOpen } = useAccordionItemContext()
  return isOpen ? <div className="accordion-panel">{children}</div> : null
}

export const Accordion = { Root, Item, Header, Panel }
