package io.github.seniya2.bar;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BarRepositoryRestResource extends PagingAndSortingRepository<Bar, String>{

	
}
