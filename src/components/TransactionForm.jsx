import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { categoriesForType } from '../utils/categories.js';
import { today } from '../utils/format.js';

const schema = yup.object({
  type: yup.string().oneOf(['income', 'expense']).required(),
  amount: yup
    .number()
    .typeError('Enter a valid amount')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().max(120, 'Keep it under 120 characters').default(''),
  date: yup.string().required('Date is required'),
});

export default function TransactionForm({ defaultValues, onSubmit, submitLabel }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues ?? {
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: today(),
    },
  });

  const type = watch('type');

  return (
    <Form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className="type-toggle">
        <Form.Label as="legend" className="type-toggle-legend">
          Type
        </Form.Label>
        <div className="type-toggle-options">
          <Form.Check
            type="radio"
            id="type-expense"
            label="Expense"
            value="expense"
            {...register('type')}
          />
          <Form.Check
            type="radio"
            id="type-income"
            label="Income"
            value="income"
            {...register('type')}
          />
        </div>
      </Form.Group>

      <Form.Group className="field">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          isInvalid={!!errors.amount}
          {...register('amount')}
        />
        <Form.Control.Feedback type="invalid">{errors.amount?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="field">
        <Form.Label>Category</Form.Label>
        <Form.Select isInvalid={!!errors.category} {...register('category')}>
          <option value="">Select a category</option>
          {categoriesForType(type).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="field">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Optional note"
          isInvalid={!!errors.description}
          {...register('description')}
        />
        <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="field">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" isInvalid={!!errors.date} {...register('date')} />
        <Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="dark" className="btn-primary" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </Form>
  );
}
