import {
  SchemasClient,
  SchemasClientConfig,
  ListRegistriesCommand,
  ListRegistriesCommandInput,
  ListSchemasCommand,
  ListSchemasCommandInput,
  DescribeSchemaCommand,
  DescribeSchemaCommandInput,
} from '@aws-sdk/client-schemas';

interface Params {
  limit?: number | undefined;
  nextToken?: string | undefined;
  prefix?: string | undefined;
}

interface Response {
  data: any;
}

export default class AWSCloud {
  client: SchemasClient;

  constructor(config: SchemasClientConfig) {
    this.client = new SchemasClient(config);
  }

  async listEventsSources(
    params: Params & { scope?: string }
  ): Promise<Response> {
    const input: ListRegistriesCommandInput = {
      Limit: params.limit,
      NextToken: params.nextToken,
      RegistryNamePrefix: params.prefix,
      Scope: params.scope,
    };
    const command = new ListRegistriesCommand(input);
    const response = await this.client.send(command);

    return { data: response };
  }

  async listEvents(params: Params & { registryName: string }): Promise<Response> {
    const input: ListSchemasCommandInput = {
      Limit: params.limit,
      NextToken: params.nextToken,
      SchemaNamePrefix: params.prefix,
      RegistryName: params.registryName,
    };
    const command = new ListSchemasCommand(input);
    const response = await this.client.send(command);

    return { data: response };
  }

  async getEventSchema(
    params: Params & { name: string; registryName: string }
  ): Promise<Response> {
    const input: DescribeSchemaCommandInput = {
      SchemaName: params.name,
      RegistryName: params.registryName,
    };
    const command = new DescribeSchemaCommand(input);
    const response = await this.client.send(command);

    return { data: response };
  }
}
