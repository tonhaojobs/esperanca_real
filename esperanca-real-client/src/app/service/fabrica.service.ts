import { Injectable, ComponentFactoryResolver, Inject } from '@angular/core';
import { LeituraComponent } from '../page/leitura/leitura.component';

@Injectable()
export class FabricaService {

  private rootViewContainer: any;
  private factoryResolver: ComponentFactoryResolver;
  component: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addComponent() {

    const factory = this.factoryResolver.resolveComponentFactory(LeituraComponent);
    this.component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(this.component.hostView);
  }

  public getComponent(): LeituraComponent {
    return this.component;
  }
}
