import { HttpStatus, ValidationPipe } from '@nestjs/common';

export enum ROLE {
  ADMIN = 'admin',
  STAFF = 'staff',
}

export enum ORDER_PRODUCT_STATUS {
  DELIVERED = 'delivered',
  NOT_YET_DELIVERED = 'not_yet_delivered',
}

export enum TABLE_STATUS {
  UNPAID = 'unpaid',
  PAID = 'paid',
  SERVING = 'serving',
}
export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password should have 1 upper case, lowcase letter along with a number and special character.';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
