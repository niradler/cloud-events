import AWSCloud from "./cloud/aws";

const main = async () => {
    try {
        const cloud = new AWSCloud({ region: "us-east-1" });
        const sources = await cloud.listEventsSources({});
        console.log(sources.data.Registries);
        const registry = sources.data.Registries[0].RegistryName;
        const events = await cloud.listEvents({ registryName: registry });
        console.log(events.data);
        const event = await cloud.getEventSchema({
            registryName: registry,
            name: events.data.Schemas[0].SchemaName,
        });
        console.log(event.data);
    } catch (error) {
        console.log(error);
    }
};

main();
