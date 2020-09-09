import { Story, Meta } from '@storybook/react/types-6-0'
import Button from '.'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'
export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
      icon: {
        type: ''
      }
    }
  }
} as Meta

export const Default: Story = (args) => <Button {...args} />

Default.args = {
  children: 'Buy now'
}

export const withIcon: Story = (args) => <Button {...args} />

withIcon.args = {
  children: 'Buy now',
  icon: <AddShoppingCart />
}
