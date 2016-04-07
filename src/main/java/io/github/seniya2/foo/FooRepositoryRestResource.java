package io.github.seniya2.foo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface FooRepositoryRestResource extends PagingAndSortingRepository<Foo, Long>{

	
}
