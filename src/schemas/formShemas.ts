import { z } from 'zod';

export type FormInputs = {
  username?: string;
  email: string;
  password: string;
  confirm?: string;
};

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Имя должно быть длинной не меньше 4 символов',
  }),
  email: z
    .string({
      required_error: 'Обязательное поле',
    })
    .email({
      message: 'Нарушен формат email',
    }),
  password: z.string().min(8, {
    message: 'Пароль должен быть длинной не меньше 8 символов',
  }),
  confirm: z.string(),
});
export const formLoginSchema = formSchema.omit({
  username: true,
  confirm: true,
});

export const formRegSchema = formSchema.refine((data) => data.password === data.confirm, {
  message: 'Пароли не совпадают',
  path: ['confirm'],
});
