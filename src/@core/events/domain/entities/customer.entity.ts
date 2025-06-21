import { AggregateRoot } from "src/@core/common/domain/aggregate-root";
import { Entity } from "src/@core/common/domain/entity";
import Cpf from "src/@core/common/domain/value-objects/cpf.vo";
import Uuid from "src/@core/common/domain/value-objects/uuid.vo";

export class CustomerId extends Uuid {}

export type CustomerConstructorProperties = {
  id?: CustomerId | string;
  cpf: Cpf;
  name: string;
}

export class Customer extends AggregateRoot {
  id: CustomerId;
  cpf: Cpf;
  name: string;

  constructor(props: CustomerConstructorProperties) {
    super();
    this.id = typeof props.id === 'string' ? new CustomerId(props.id) : props.id ?? new CustomerId();
    this.cpf = props.cpf;
    this.name = props.name;
  }

  static create(command: {name: string; cpf: string}) {
    const customer = new Customer({
      name: command.name,
      cpf: new Cpf(command.cpf),
    });
    return customer;
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name
    }
  }
}
