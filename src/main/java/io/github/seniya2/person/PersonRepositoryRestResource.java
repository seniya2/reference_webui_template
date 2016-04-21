package io.github.seniya2.person;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "person", path = "person")
public interface PersonRepositoryRestResource extends PagingAndSortingRepository<Person, Long>{

	
}
