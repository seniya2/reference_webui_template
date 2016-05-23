package reference_webui_template.blog;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "blog", path = "blog")
public interface BlogRepository extends PagingAndSortingRepository<Blog, Long>{

}
